export const { NODE_ENV = 'development', HTTP_PORT = 3000 } = process.env

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
