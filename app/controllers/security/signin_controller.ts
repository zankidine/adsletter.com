import { RegistrationService } from '#services/registration_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

@inject()
export default class SigninController {
  constructor(protected registrationService: RegistrationService) {}

  async render({ inertia }: HttpContext) {
    return inertia.render('private/security/signin')
  }

  async execute({ request }: HttpContext) {
    const schema = vine.compile(
      vine.object({
        email: vine.string().email(),
      })
    )

    const payload = await request.validateUsing(schema)

    const user = await this.registrationService.registerWithEmail(payload.email)

    return { user }
  }
  
}