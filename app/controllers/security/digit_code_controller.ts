import type { HttpContext } from '@adonisjs/core/http'

export default class DigitCodeController {

  async render({ inertia }: HttpContext) {
    return inertia.render('private/security/digitcode');
  }

  async execute({}: HttpContext) {}
  
}