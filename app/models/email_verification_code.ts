import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import type { IDigitCodeType } from '#enums/digit_code_type'

export default class EmailVerificationCode extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare code: string

  @column()
  declare type: IDigitCodeType

  @column.dateTime()
  declare expiresAt: DateTime | null

  @column.dateTime()
  declare usedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Helper methods
  get isExpired(): boolean {
    if (!this.expiresAt) return false
    return this.expiresAt < DateTime.now()
  }

  get isUsed(): boolean {
    return this.usedAt !== null
  }

  get isValid(): boolean {
    return !this.isExpired && !this.isUsed
  }

  markAsUsed(): void {
    this.usedAt = DateTime.now()
  }
}