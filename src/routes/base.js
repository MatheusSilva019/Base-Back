const route = "/base"
const api = require("../api/base")
const auth = require("../api/auth")

module.exports = (router) => {
  router.route(route).all(auth.validate).get(api.get).post(api.insert)
  router.route(`${route}/:id`).all(auth.validate).patch(api.update).delete(api.remove)
}
