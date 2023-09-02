/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("user").insert([
    {
      name: "Teste",
      email: "teste@email.com",
      password: "$2b$10$3qWOYbAMTaDodeXgl2UWVu5GC11i/0j7BCwD0gWixwMeNWZFdzFdW",
    },
  ])
}
