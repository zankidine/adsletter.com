export const DigitCodeType = {
    REGISTRATION: 'registration',
    EMAIL_VERIFICATION: 'email_verification',
    PASSWORD_RESET: 'password_reset',
    LOGIN: 'login',
} as const

export type IDigitCodeType = (typeof DigitCodeType)[keyof typeof DigitCodeType]