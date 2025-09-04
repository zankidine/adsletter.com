import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import EmailVerificationDigitCode from './email_verification_digit_code.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string | null

  @column({ serializeAs: null })
  declare resetPasswordToken: string | null

  @column()
  declare avatarUrl: string | null

  @column()
  declare provider: string

  @column()
  declare providerId: string | null

  @column()
  declare deviceInfo: object | null

  @column()
  declare ipAddress: string | null

  @column()
  declare userAgent: string | null

  @column()
  declare userName: string | null

  @column()
  declare bio: string | null

  @column()
  declare website: string | null

  @column()
  declare instagram: string | null

  @column()
  declare twitter: string | null

  @column()
  declare linkedin: string | null

  @column()
  declare facebook: string | null

  @column()
  declare youtube: string | null

  @column()
  declare tiktok: string | null

  @column()
  declare github: string | null

  @column()
  declare phoneNumber: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column.dateTime()
  declare lastLoginAt: DateTime | null

  // Relations
  @hasMany(() => EmailVerificationDigitCode)
  declare emailVerificationDigitCodes: HasMany<typeof EmailVerificationDigitCode>

}