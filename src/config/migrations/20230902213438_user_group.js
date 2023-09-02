/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_group", function (table) {
    table.increments("id").primary();
    table.integer("id_user").references("user.id").unsigned().notNullable();
    table.integer("id_group").references("group.id").unsigned().notNullable();

    table.timestamps(true, true);
    table.datetime("deleted_at").defaultTo(null);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_group");
};
