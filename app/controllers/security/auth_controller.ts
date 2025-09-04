import User from '#models/user';
import { AuthenticationService } from '#services/authentication_service';
import { DeviceInfoExtractorService } from '#services/device_info_extractor_service';
import { RegistrationService } from '#services/registration_service';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine';

@inject()
export default class AuthController {
    constructor(
        protected authService: AuthenticationService,
        protected registrationService: RegistrationService,
        private deviceInfoExtractorService: DeviceInfoExtractorService
    ) {}

    /**
   * Gère la soumission de l'email pour inscription ou connexion
   */
    async handleEmailAuth({ request, response }: HttpContext) {
        const schema = vine.compile(
            vine.object({
                email: vine.string().email(),
            })
        )

        const payload = await request.validateUsing(schema)

        // Vérifier si l'utilisateur existe
        const user = await User.findBy('email', payload.email)

        if (!user) {
            // Inscription si l'utilisateur n'existe pas
            const newUser = await this.registrationService.registerWithEmail(payload.email)
            return response.json({
                status: 'register',
                message: 'Code de vérification envoyé',
                userId: newUser.id,
                nextStep: 'verify-code',
            })
        }

        // Vérifier si l'utilisateur a un mot de passe
        const hasPassword = await this.authService.userHasPassword(payload.email)
        if (hasPassword) {
            return response.json({
                status: 'login',
                message: 'Utilisateur existant avec mot de passe',
                userId: user.id,
                nextStep: 'enter-password',
            })
        }

        // Envoyer un code de connexion si pas de mot de passe
        await this.authService.sendLoginCode(payload.email)
        return response.json({
            status: 'login',
            message: 'Code de connexion envoyé',
            userId: user.id,
            nextStep: 'enter-code',
        })
    }

    /**
   * Bascule vers l'authentification par code pour un utilisateur existant
   */
    async switchToCodeAuth({ request, response, inertia }: HttpContext) {
        const schema = vine.compile(
            vine.object({
                email: vine.string().email(),
            })
        )

        const payload = await request.validateUsing(schema)

        // Vérifier si l'utilisateur existe
        const user = await User.findBy('email', payload.email)
        if (!user) {
            return response.status(404).json({ error: 'Utilisateur non trouvé' })
        }

        // Envoyer un code de connexion
        await this.authService.sendLoginCode(payload.email)
        return inertia.render('private/security/digitcode', { email: payload.email });
    }

    /**
   * Connecte un utilisateur avec email et mot de passe
   */
    async loginWithPassword({ request }: HttpContext) {
        const schema = vine.compile(
            vine.object({
                email: vine.string().email(),
                password: vine.string().minLength(8),
            })
        )

        const payload = await request.validateUsing(schema)
        const deviceInfo = this.deviceInfoExtractorService.extractFromRequest(request)

        const user = await this.authService.loginWithPassword(payload.email, payload.password, deviceInfo)

        return {user}
    }

    /**
   * Connecte un utilisateur avec email et code PIN
   */
    async loginWithCode({ request}: HttpContext) {
        const schema = vine.compile(
            vine.object({
                email: vine.string().email(),
                code: vine.string().maxLength(6),
            })
        )

        const payload = await request.validateUsing(schema)
        const deviceInfo = this.deviceInfoExtractorService.extractFromRequest(request)

        const user = await this.authService.loginWithCode(payload.email, payload.code, deviceInfo)

        return {user}
    }

    /**
   * Déconnecte l'utilisateur
   */
    async logout({ auth, response }: HttpContext) {
        await auth.use('web').logout()
        return response.json({ message: 'Déconnexion réussie' })
    }
}