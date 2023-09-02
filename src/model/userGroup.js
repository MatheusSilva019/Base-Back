const Joi = require('joi')
const error = require('../config/error-message')

const object = Joi.object().keys({
  idUser: Joi.number().required().messages(error.message('ID usuário')),
  idGroup: Joi.number().required().messages(error.message('ID grupo')),
})

module.exports = { object }
