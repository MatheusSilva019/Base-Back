/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("user_group").insert([
    {
      id_user: 1,
      id_group: 1,
    },
  ])
}