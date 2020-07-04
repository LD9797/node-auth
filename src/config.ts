const ONE_DAY = 1000 * 60 * 60 * 24

export const {
  NODE_ENV = 'development',
  HTTP_PORT = 3000,

  SESS_NAME = 'sid',
  SESS_SECRET = 'ssh!secret!',
  SESS_LIFETIME = ONE_DAY,

  REDIS_HOST = 'redis-16891.c56.east-us.azure.cloud.redislabs.com',
  REDIS_PORT = 16891,
  REDIS_PASSWORD = 'uVzgjERtOLZNHPiRQgA2nosRgnE6WjZw',
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
