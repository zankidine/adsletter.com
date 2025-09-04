import mail from '@adonisjs/mail/services/main'
import type { IDigitCodeType } from "#enums/digit_code_type";
import type  User from "#models/user";
import SendVerificationDigitCodeNotification from '#mails/send_verification_digit_code_notification';
import SendResetPasswordInstructionsNotification from '#mails/send_reset_password_instructions_notification';

/**
 * Service centralisé pour l'envoi d'emails
 * Gère tous les types d'emails du module de sécurité
*/
export class EmailService {
  /**
   * Envoie un email de vérification avec code PIN
   * @param user - Utilisateur destinataire
   * @param code - Code de vérification à 6 chiffres
   * @param type - Type de vérification ('registration' | 'login')
   */
  async sendVerificationDigitCode(user: User, code: string, type: IDigitCodeType): Promise<void> {
    try {
      await mail.sendLater(
        new SendVerificationDigitCodeNotification({user, code, type})
      )
    } catch (error) {
      console.error('Erreur lors de l\'envoi du code de vérification:', error)
      throw new Error('Impossible d\'envoyer l\'email de vérification')
    }
  }

  /**
   * Envoie un email de réinitialisation de mot de passe
   * @param user - Utilisateur destinataire
   * @param resetToken - Token de réinitialisation
   * @param resetUrl - URL complète de réinitialisation
   */
  async sendResetPasswordInstructions(user: User, resetToken: string): Promise<void> {
    try {
      await mail.sendLater(
        new SendResetPasswordInstructionsNotification({user, resetToken})
      )
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi des instructions de réinitialisation:', error)
      throw new Error('Impossible d\'envoyer l\'email de réinitialisation')
    }
  }

}