import { DeviceInfoExtractorService } from '#services/device_info_extractor_service';
import { RegistrationService } from '#services/registration_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class SocialAuthController {
  constructor(
    protected registrationService: RegistrationService,
    private deviceInfoExtractorService: DeviceInfoExtractorService
  ) {}
  
  async redirect({ally, params }: HttpContext) {
    return ally.use(params.provider).redirect()
  }
  
  async callback({ ally, params, request }: HttpContext) {
    const socialUser = await ally.use(params.provider).user();
    const deviceInfo = this.deviceInfoExtractorService.extractFromRequest(request);
    const user = await this.registrationService.registerWithGoogle(socialUser, deviceInfo)

    //await auth.use('web').login(user)

    return {user}
  }
  
}