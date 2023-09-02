const dbo = require("../dbo/base")
const { messages } = require("joi-translation-pt-br")
const validation = require("../model/user")
const tableName = "user"

const get = async (object) => {
  const limit = object.limit
  const page = object.page

  if (object.id) {
    const params = { column: "id", value: `%${object.id}%`, operator: "like" }
    return await dbo.get(tableName, limit, page, params)
  }
  if (object.name) {
    const params = { column: "name", value: `%${object.name}%`, operator: "like", }
    return await dbo.get(tableName, limit, page, params)
  }

  return await dbo.get(tableName, limit, page)
}

const insert = async (object) => {
  try {
    await validation.object.validateAsync(object, {
      abortEarly: false,
      messages: messages,
    })
  } catch (error) {
    const errors = error.details.map((el) => el.message)
    return { errors }
  }

  return await dbo.insert(object, tableName)
}

const update = async (object, id) => {
  if (!id) {
    return false
  }
  try {
    await validation.object.validateAsync(object, {
      abortEarly: false,
      messages: messages,
    })
  } catch (error) {
    const errors = error.details.map((el) => el.message)
    return { errors }
  }
  return await dbo.update(object, id, tableName)
}

const remove = async (id) => {
  if (!id) {
    return false
  }
  return await dbo.remove(id, tableName)
}

module.exports = {
  get,
  insert,
  update,
  remove,
}
