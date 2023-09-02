const facade = require("../facade/login")
const moment = require("moment")

const post = async (req, res) => {
  const object = req.query
  const result = await facade.post(object)

  if (typeof result === "number") {
    return res.sendStatus(result)
  }

  if (result && result.length != 0 && result.status === 1) {
    const now = moment()
    res.cookie("cookieID", result.id)
    res.cookie("cookieTime", now)
    delete result.password
  }

  return res.status(200).send(result)
}

module.exports = {
  post,
}
