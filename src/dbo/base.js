const { date } = require("joi")
const db = require("../config/db")

const get = async (tableName, limit = 10, page = 1, params) => {
  const offset = (page - 1) * limit

  const baseQuery =
    params && params.column && params.value
      ? db(tableName)
          .where("deleted_at", null)
          .where(params.column, params.operator, params.value)
      : db(tableName).where("deleted_at", null)

  const result = await baseQuery
    .clone()
    .select()
    .limit(limit)
    .offset(offset)
    .catch((error) => {
      console.log(error.message)
      return []
    })

  const count = await baseQuery
    .clone()
    .count("id as quantity")
    .first()
    .catch((error) => {
      console.log(error.message)
      return []
    })

  return {
    data: result,
    actualPage: page,
    total: count.quantity,
  }
}

const insert = async (object, tableName) => {
  const result = await db(tableName)
    .insert(object)
    .catch((err) => {
      console.log(err.message)
      return { errors: err.message }
    })

  return result
}

const update = async (object, id, tableName) => {
  const result = await db(tableName)
    .update(object)
    .where("id", id)
    .catch((err) => {
      return { errors: err.message }
    })
  return result
}

const remove = async (id, tableName) => {
  const result = await db(tableName)
    .update({ deleted_at: new Date() })
    .where("id", id)
    .catch((err) => {
      console.log(err)
      return false
    })
  return result
}

const login = async (tableName, email) => {
  const result = await db(tableName)
    .select()
    .where("email", email)
    .where("deleted_at", null)
    // .where("status", 1)
    .first()
    .catch((err) => {
      return false
    })
  return result
}

module.exports = {
  get,
  insert,
  update,
  remove,
  login,
}
