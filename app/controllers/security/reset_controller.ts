import { PasswordService } from '#services/password_service';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine';

@inject()
export default class ResetController {
  constructor(protected passwordService: PasswordService) { }

  async render({ inertia }: HttpContext) {
    return inertia.render('private/security/reset');
  }

  /**
   * Initie une réinitialisation de mot de passe
   */
  async initiateReset({ request, response }: HttpContext) {
    const schema = vine.compile(
      vine.object({
        email: vine.string().email(),
      })
    )

    const payload = await request.validateUsing(schema)

    const success = await this.passwordService.initiatePasswordReset(payload.email)

    if (!success) {
      return response.status(404).json({ error: 'Utilisateur non trouvé' })
    }
    return response.json({ message: 'Email de réinitialisation envoyé' })
  }

  async reset({ auth, request, response }: HttpContext) {
    const schema = vine.compile(
      vine.object({
        newPassword: vine.string().minLength(8),
      })
    )

    const payload = await request.validateUsing(schema)
    const user = auth.getUserOrFail()

    await this.passwordService.setPassword(user, payload.newPassword)
    return response.json({ message: 'Mot de passe défini avec succès' })
  }

}