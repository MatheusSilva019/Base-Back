/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user", function (table) {
    table.increments("id").primary()
    table.string("name").notNullable()
    table.string("email").unique().notNullable()
    table.string("password").notNullable()
    table.boolean("status").defaultTo(true)

    table.timestamps(true, true)
    table.datetime("deleted_at").defaultTo(null)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user")
}
