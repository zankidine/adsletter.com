import type { IDigitCodeType } from '#enums/digit_code_type'
import type User from '#models/user'
import { BaseMail } from '@adonisjs/mail'

interface SendVerificationDigitCodeNotificationOptions {
  user: User
  code: string
  type: IDigitCodeType
}

export default class SendVerificationDigitCodeNotification extends BaseMail {
  
  constructor(private options: SendVerificationDigitCodeNotificationOptions) {
    super()
  }

  prepare() {
    this.message
      .to(this.options.user.email)
      .from('support@adsletter.com', 'AdsLetter')
      .subject(this.getSubject())
      .htmlView('emails/security/digitcode', {
        user: this.options.user,
        code: this.options.code,
        type: this.options.type,
      })
  }

  /**
   * Retourne le sujet de l'email selon le type
   */
  private getSubject(): string {
    if (this.options.type === 'registration') {
      return `${this.options.code} est votre code de confirmation Ads Letter`
    }
    return `${this.options.code} est votre code de connexion Ads Letter`
  }
}