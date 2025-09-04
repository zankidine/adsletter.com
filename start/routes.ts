import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/security/auth_controller')
const SocialAuthController = () => import('#controllers/security/social_auth_controller')
const SigninController = () => import('#controllers/security/signin_controller')
const LoginController = () => import('#controllers/security/login_controller')
const DigitCodeController = () => import('#controllers/security/digit_code_controller')
const ResetController = () => import('#controllers/security/reset_controller')

router.on('/mail').render('emails/reset')

router.group(() => {
    router.get('/', [SigninController, 'render'])
    router.get('/digit-code', [DigitCodeController, 'render'])
    router.get('/login', [LoginController, 'render'])
    router.get('/reset', [ResetController, 'render'])
    router.post('/password/initiate', [ResetController, 'initiateReset'])
    router.post('/password/reset', [ResetController, 'reset'])

    router.post('/auth/email', [AuthController, 'handleEmailAuth'])
    router.post('/auth/switch-to-code', [AuthController, 'switchToCodeAuth'])
    router.post('/auth/login/password', [AuthController, 'loginWithPassword'])
    router.post('/auth/login/code', [AuthController, 'loginWithCode'])
    router.post('/auth/logout', [AuthController, 'logout'])

    router.get('oauth/:provider/redirect', [SocialAuthController, 'redirect']).where('provider', /google/)
    router.get('oauth/:provider/callback', [SocialAuthController, 'callback']).where('provider', /google/)
})

