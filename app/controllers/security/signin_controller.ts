import type { HttpContext } from '@adonisjs/core/http'

export default class SigninController {

  async render({ inertia }: HttpContext) {
    return inertia.render('private/security/signin')
  }

  async execute({}: HttpContext) {}
  
}