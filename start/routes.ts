import router from '@adonisjs/core/services/router'

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
})

