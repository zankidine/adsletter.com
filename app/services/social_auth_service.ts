import User from '#models/user'
import { AllyUserContract, GoogleToken, SocialProviders } from '@adonisjs/ally/types'

type SocialUser = AllyUserContract<GoogleToken>

/**
 * Service pour gérer l'authentification sociale (Google)
 */
export class SocialAuthService {
  /**
   * Gère l'inscription ou la connexion via un provider social
   * @param socialUser - Données de l'utilisateur provenant du provider social
   * @param provider - Nom du provider (ex. 'google')
   * @param deviceInfo - Informations sur l'appareil (optionnel)
   * @returns L'utilisateur créé ou existant
   */
  async handleSocialAuth(socialUser: SocialUser, provider: keyof SocialProviders, deviceInfo?: object): Promise<User> {
    // Recherche d'un utilisateur existant par provider_id et provider
    let user = await User.query()
      .where('provider_id', socialUser.id)
      .where('provider', provider)
      .first()

    if (user) {
      // Mise à jour des informations de l'appareil si fourni
      if (deviceInfo) {
        user.deviceInfo = deviceInfo
        await user.save()
      }
      return user
    }

    // Recherche d'un utilisateur existant par email
    user = await User.findBy('email', socialUser.email!)
    if (user) {
      // Mise à jour du provider et provider_id pour permettre la connexion via Google
      user.provider = provider
      user.providerId = socialUser.id
      if (deviceInfo) {
        user.deviceInfo = deviceInfo
      }
      await user.save()
      return user
    }

    // Création d'un nouvel utilisateur
    user = await User.create({
      email: socialUser.email!,
      firstName: socialUser.name.split(' ')[0] || null,
      lastName: socialUser.name.split(' ')[1] || null,
      provider: provider,
      providerId: socialUser.id,
      avatarUrl: socialUser.avatarUrl || null,
      deviceInfo: deviceInfo || null,
    })

    return user
  }
}