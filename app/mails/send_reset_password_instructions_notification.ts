import type User from '#models/user'
import { BaseMail } from '@adonisjs/mail'

interface SendResetPasswordInstructionsNotificationOptions {
  user: User
  resetToken: string
}

export default class SendResetPasswordInstructionsNotification extends BaseMail {
  constructor(private options: SendResetPasswordInstructionsNotificationOptions) {
    super()
  }

  prepare() {
    const resetUrl = `https://adsletter.com/reset-password?key=${this.options.resetToken}`
    this.message
      .to(this.options.user.email)
      .from('support@adsletter.com', 'AdsLetter')
      .subject('Réinitialisez votre mot de passe Ads Letter')
      .htmlView('emails/security/reset', {
        user: this.options.user,
        resetToken: this.options.resetToken,
        resetUrl,
      })
  }
}