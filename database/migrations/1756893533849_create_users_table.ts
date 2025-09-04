import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').nullable()
      table.string('reset_password_token').nullable()
      table.string('avatar_url').nullable()
      table.string('provider').notNullable().defaultTo('local')
      table.string('provider_id').nullable()

      table.jsonb('device_info').nullable()
      table.string('ip_address').nullable()
      table.string('user_agent').nullable()

      table.string('user_name').nullable().unique()
      table.string('bio').nullable()
      table.string('website').nullable()
      table.string('instagram').nullable()
      table.string('twitter').nullable()
      table.string('linkedin').nullable()
      table.string('facebook').nullable()
      table.string('youtube').nullable()
      table.string('tiktok').nullable()
      table.string('github').nullable()
      
      table.string('phone_number').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('last_login_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}