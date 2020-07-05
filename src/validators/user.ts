import Joi from '@hapi/joi'

const name = Joi.string().max(100).trim().required().label('Name')
const first_last_name = Joi.string()
  .max(100)
  .trim()
  .required()
  .label('first_last_name')
const second_last_name = Joi.string().max(100).trim().label('second_last_name')

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .trim()
  .lowercase()
  .required()
  .label('Email')

const password = Joi.string()
  .min(8)
  .max(100)
  .regex(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).*$/)
  .message(
    'Must have at least one lowercase letter, one uppercase letter, and one digit.'
  )
  .required()
  .label('Password')

export const signUp = Joi.object().keys({
  name,
  first_last_name,
  second_last_name,
  email,
  password,
})

export const signIn = Joi.object().keys({
  email,
  password,
})
