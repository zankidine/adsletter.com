import { IDigitCodeType } from '#enums/digit_code_type'
import EmailVerificationDigitCode from '#models/email_verification_digit_code'
import { DateTime } from 'luxon'
import crypto from 'node:crypto'


/**
 * Service utilitaire pour la génération de codes
 * Codes PIN, tokens de réinitialisation
*/
export class DigitCodeGeneratorService {
  /**
   * Génère un code PIN à 6 chiffres
   */
  generatePinCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  /**
   * Génère un token de réinitialisation sécurisé
   */
  generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex')
  }

  /**
   * Vérifie l'unicité d'un code
   * @param code - Le code à vérifier
   * @param type - Le type de code
   * @returns true si le code est unique, false sinon
   */
  async ensureCodeUniqueness(code: string, type: IDigitCodeType): Promise<boolean> {
    const existingCode = await EmailVerificationDigitCode.query()
      .where('code', code)
      .where('type', type)
      .whereNull('used_at')
      .where('expires_at', '>', DateTime.now().toSQL())
      .first()

    return !existingCode
  }

  /**
   * Nettoie les codes expirés
   * @returns Le nombre de codes supprimés
  */
  async cleanupExpiredCodes(): Promise<number> {
    const result = await EmailVerificationDigitCode.query()
      .where('expires_at', '<', DateTime.now().toSQL())
      .delete()

    return Array.isArray(result) ? result.length : result || 0
  }
}