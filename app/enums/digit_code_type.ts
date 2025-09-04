export const DigitCodeType = {
    REGISTRATION: 'registration',
    EMAIL_VERIFICATION: 'email_verification',
    PASSWORD_RESET: 'password_reset',
} as const

export type IDigitCodeType = (typeof DigitCodeType)[keyof typeof DigitCodeType]