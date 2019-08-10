import * as Joi from '@hapi/joi'

export const REGISTER_SCHEMA = {

  password: Joi.string().alphanum().min(6).max(30).required(),
  password2: Joi.any().valid(Joi.ref('password')).required().error(errors => errors.map(error => {
    switch(error.type) {
      case 'any.allowOnly': error.message = 'Пароли должны совпадать!'
    }

    return error
  })),
  email: Joi.string().email({ minDomainSegments: 2 }),
}