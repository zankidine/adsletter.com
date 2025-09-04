import { inject } from "@adonisjs/core";
import { DigitCodeGeneratorService } from "./digit_code_generator_service.js";
import { EmailService } from "./email_service.js";
import { SocialAuthService } from "./social_auth_service.js";
import User from "#models/user";
import { DigitCodeType, type IDigitCodeType } from "#enums/digit_code_type";
import { DateTime } from "luxon";
import type { AllyUserContract, GoogleToken } from "@adonisjs/ally/types";


/**
 * Service pour l'inscription des utilisateurs
 * Gère l'inscription classique et via Google
*/
@inject()
export class RegistrationService {
  constructor(
    private digitCodeGenerator: DigitCodeGeneratorService,
    private emailService: EmailService,
    private socialAuthService: SocialAuthService
  ) {}

  /**
   * Inscrit un utilisateur avec email (envoie code de vérification)
   */
  async registerWithEmail(email: string): Promise<User> {
    let user = await User.findBy('email', email)
    if (user) {
      // Si l'utilisateur existe (via Google ou email), envoyer un code de vérification sans modifier
      const code = this.digitCodeGenerator.generatePinCode()
      await user.related('emailVerificationDigitCodes').create({
        code,
        type: DigitCodeType.EMAIL_VERIFICATION,
      })
      await this.emailService.sendVerificationDigitCode(user, code, DigitCodeType.EMAIL_VERIFICATION)
      return user
    }

    // Créer un nouvel utilisateur
    user = await User.create({
      email: email,
      provider: 'local',
    })

    const code = this.digitCodeGenerator.generatePinCode()
    await user.related('emailVerificationDigitCodes').create({
        code,
        type: DigitCodeType.EMAIL_VERIFICATION,
    })
    await this.emailService.sendVerificationDigitCode(user, code, DigitCodeType.EMAIL_VERIFICATION)
    
    
    return user
  }

  /**
   * Vérifie le code d'inscription et active le compte
   * @param email - Email de l'utilisateur
   * @param code - Code de vérification
   * @returns true si le code est valide et le compte activé, false sinon
   */
  async verifyRegistrationCode(email: string, code: string): Promise<boolean> {
    const user = await User.findBy('email', email)
    if (!user) {
      return false
    }

    const isValid = await user.related('emailVerificationDigitCodes').query()
      .where('code', code)
      .andWhere('type', DigitCodeType.EMAIL_VERIFICATION)
      .andWhere('isUsed', false)
      .andWhere('expiresAt', '>', DateTime.now().toSQL())
      .first()

    if (isValid !== null) {
      // Marquer l'utilisateur comme actif (si nécessaire, ajouter un champ isActive dans le modèle)
      user.lastLoginAt = DateTime.now()
      await user.save()
    }

    return isValid !== null
  }

  /**
   * Inscrit/connecte un utilisateur via Google
   * @param googleUser - Données de l'utilisateur Google
   * @param deviceInfo - Informations sur l'appareil
   * @returns L'utilisateur créé ou connecté
   */
  async registerWithGoogle(googleUser: AllyUserContract<GoogleToken>, deviceInfo?: object): Promise<User> {
    return this.socialAuthService.handleSocialAuth(googleUser, 'google', deviceInfo)
  }

  /**
   * Renvoie un code de vérification
   * @param email - Email de l'utilisateur
   * @param type - Type de code
   * @returns true si le code a été envoyé, false si l'utilisateur n'existe pas
   */
  async resendVerificationCode(email: string, type: IDigitCodeType): Promise<boolean> {
    const user = await User.findBy('email', email)
    if (!user) {
      return false
    }

    // Invalider les codes précédents pour ce type
    await user.related('emailVerificationDigitCodes').query()
      .where('type', type)
      .andWhere('isUsed', false)
      .update({ isUsed: true })
    
    // Générer et envoyer un nouveau code
    const code = this.digitCodeGenerator.generatePinCode()
    await user.related('emailVerificationDigitCodes').create({
      code,
      type,
    })
    await this.emailService.sendVerificationDigitCode(user, code, type)
    
    
    return true
  }
}