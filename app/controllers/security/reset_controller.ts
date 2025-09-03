import type { HttpContext } from '@adonisjs/core/http'

export default class ResetController {

  async render({ inertia }: HttpContext) {
    return inertia.render('private/security/reset');
  }

  async execute({}: HttpContext) {}
  
}