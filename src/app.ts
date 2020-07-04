import 'reflect-metadata'
import express from 'express'
import session from 'express-session'
import { ApolloServer } from 'apollo-server-express'
import { APOLLO_OPTIONS, SESS_OPTIONS } from './config'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { createConnection } from 'typeorm'

const createApp = async (store?: session.Store) => {
  await createConnection().then(() => console.log('Connected to MySQL'))
  const app = express()
  const sessionHandler = session({
    store,
    ...SESS_OPTIONS,
  })
  app.use(sessionHandler)
  const server = new ApolloServer({
    ...APOLLO_OPTIONS,
    typeDefs,
    resolvers,
    context: ({ req, res, connection }) =>
      connection ? connection.context : { req, res },
  })
  server.applyMiddleware({ app, cors: false })
  return { app, server }
}

export default createApp
