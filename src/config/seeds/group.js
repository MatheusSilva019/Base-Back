/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("group").insert([
    {
      name: "Administradores",
    },
  ])
}