import * as dotenv from 'dotenv'
dotenv.config()

const ONE_DAY = 1000 * 60 * 60 * 24

export const {
  NODE_ENV = process.env.NODE_ENV,
  HTTP_PORT = process.env.HTTP_PORT,

  SESS_NAME = process.env.SESS_NAME as string,
  SESS_SECRET = process.env.SESS_SECRET as string,
  SESS_LIFETIME = ONE_DAY,

  REDIS_HOST = process.env.REDIS_HOST,
  REDIS_PORT = !process.env.REDIS_PORT,
  REDIS_PASSWORD = process.env.REDIS_PASSWORD,
} = process.env

export const IN_PROD = NODE_ENV === 'production'

export const APOLLO_OPTIONS = {
  playground: IN_PROD
    ? false
    : {
        settings: {
          'request.credentials': 'include',
        },
      },
}

export const REDIS_OPTIONS = {
  host: REDIS_HOST,
  port: +REDIS_PORT,
  password: REDIS_PASSWORD,
}

export const SESS_OPTIONS = {
  name: SESS_NAME,
  secret: SESS_SECRET,
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: +SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD,
  },
}

export const ORM_OPTIONS = {
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE_NAME: process.env.DB_DATABASE_NAME,
}
