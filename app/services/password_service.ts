import { inject } from "@adonisjs/core";
import { EmailService } from "./email_service.js";
import { DigitCodeGeneratorService } from "./digit_code_generator_service.js";
import hash from "@adonisjs/core/services/hash";
import User from "#models/user";
import { DateTime } from "luxon";

/**
 * Service pour la gestion des mots de passe
 * Définition, réinitialisation et validation
*/
@inject()
export class PasswordService {
  constructor(
    private digitCodeGenerator: DigitCodeGeneratorService,
    private emailService: EmailService
  ) {}

  /**
   * Définit un nouveau mot de passe pour un utilisateur
   * @param user - L'utilisateur connecté
   * @param newPassword - Le nouveau mot de passe
   */
  async setPassword(user: User, newPassword: string): Promise<void> {
    // Hacher le nouveau mot de passe
    user.password = await hash.make(newPassword)
    await user.save()
  }

  /**
   * Initie une réinitialisation de mot de passe
   * @param email - Email de l'utilisateur
   * @returns true si l'email a été envoyé, false si l'utilisateur n'existe pas
   */
  async initiatePasswordReset(email: string): Promise<boolean> {
    const user = await User.findBy('email', email)
    if (!user) {
      return false
    }

    // Générer un token de réinitialisation
    const token = this.digitCodeGenerator.generateResetToken()
    user.resetPasswordToken = token
    user.updatedAt = DateTime.now() // Utilisé pour vérifier l'expiration du token
    await user.save()

    // Envoyer l'email de réinitialisation
    await this.emailService.sendResetPasswordInstructions(user, token)

    return true
  }

  /**
   * Réinitialise le mot de passe avec un token
   * @param token - Le token de réinitialisation
   * @param newPassword - Le nouveau mot de passe
   * @returns true si le mot de passe a été réinitialisé, false si le token est invalide ou expiré
   */
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const user = await User.query()
      .where('reset_password_token', token)
      .where('updated_at', '>', DateTime.now().minus({ hours: 2 }).toSQL()) // Token expire après 2 heures
      .first()

    if (!user) {
      return false
    }

    // Hacher et définir le nouveau mot de passe
    user.password = await hash.make(newPassword)
    user.resetPasswordToken = null // Réinitialiser le token
    await user.save()

    return true
  }
}