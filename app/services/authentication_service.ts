import User from "#models/user";
import hash from "@adonisjs/core/services/hash";
import { DigitCodeGeneratorService } from "./digit_code_generator_service.js";
import { EmailService } from "./email_service.js";
import { RegistrationService } from "./registration_service.js";
import { DateTime } from "luxon";
import { DigitCodeType } from "#enums/digit_code_type";

/**
 * Service principal pour l'authentification des utilisateurs
 * Gère les connexions par email/mot de passe et par code PIN
 */
export class AuthenticationService {
  constructor(
    private digitCodeGenerator: DigitCodeGeneratorService,
    private emailService: EmailService,
    private registrationService: RegistrationService
  ) {}

  /**
   * Authentifie un utilisateur avec email et mot de passe
   * @param email - Email de l'utilisateur
   * @param password - Mot de passe de l'utilisateur
   * @param deviceInfo - Informations sur l'appareil
   * @returns L'utilisateur authentifié
   * @throws Error si les identifiants sont invalides
   */
  async loginWithPassword(email: string, password: string, deviceInfo?: object): Promise<User> {
    let user = await User.findBy('email', email)

    // Si l'utilisateur n'existe pas, déclencher l'inscription
    if (!user) {
      user = await this.registrationService.registerWithEmail(email)
    }

    // Vérifier si l'utilisateur a un mot de passe défini
    if (!user.password) {
      throw new Error('Aucun mot de passe défini pour cet utilisateur. Utilisez un code de connexion.')
    }

    // Vérifier le mot de passe
    const isValid = await hash.verify(user.password, password)
    if (!isValid) {
      throw new Error('Mot de passe incorrect')
    }

    // Mettre à jour les informations de l'appareil
    if (deviceInfo) {
      user.deviceInfo = deviceInfo
    }
    user.lastLoginAt = DateTime.now()
    await user.save()

    return user
  }

  /**
   * Authentifie un utilisateur avec un code PIN
   * @param email - Email de l'utilisateur
   * @param code - Code PIN de connexion
   * @param deviceInfo - Informations sur l'appareil
   * @returns L'utilisateur authentifié
   * @throws Error si le code est invalide
   */
  async loginWithCode(email: string, code: string, deviceInfo?: object): Promise<User> {
    let user = await User.findBy('email', email)

    // Si l'utilisateur n'existe pas, déclencher l'inscription
    if (!user) {
      user = await this.registrationService.registerWithEmail(email)
    }

    // Vérifier le code PIN
    const isValid = await user.related('emailVerificationDigitCodes').query()
      .where('code', code)
      .where('type', DigitCodeType.LOGIN)
      .whereNull('used_at')
      .where('expires_at', '>', DateTime.now().toSQL())
      .first()

    if (!isValid) {
      throw new Error('Code PIN invalide ou expiré')
    }

    // Marquer le code comme utilisé
    isValid.usedAt = DateTime.now()
    await isValid.save()

    // Mettre à jour les informations de l'appareil
    if (deviceInfo) {
      user.deviceInfo = deviceInfo
    }
    user.lastLoginAt = DateTime.now()
    await user.save()

    return user
  }

  /**
   * Vérifie si l'utilisateur a défini un mot de passe
   * @param email - Email de l'utilisateur
   * @returns true si l'utilisateur a un mot de passe, false sinon
   */
  async userHasPassword(email: string): Promise<boolean> {
    const user = await User.findBy('email', email)
    return !!user?.password
  }

  /**
   * Génère et envoie un code de connexion
   * @param email - Email de l'utilisateur
   * @returns true si le code a été envoyé, false si l'utilisateur n'existe pas
   */
  async sendLoginCode(email: string): Promise<boolean> {
    let user = await User.findBy('email', email)

    // Si l'utilisateur n'existe pas, déclencher l'inscription
    if (!user) {
      user = await this.registrationService.registerWithEmail(email)
    }

    // Générer un code PIN
    const code = this.digitCodeGenerator.generatePinCode()

    // Créer un nouveau code de connexion
    await user.related('emailVerificationDigitCodes').create({
      code,
      type: DigitCodeType.LOGIN,
      expiresAt: DateTime.now().plus({ minutes: 10 }),
    })

    // Envoyer l'email avec le code
    await this.emailService.sendVerificationDigitCode(user, code, DigitCodeType.LOGIN)

    return true
  }
}