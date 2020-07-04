import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { APOLLO_OPTIONS } from './config'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const createApp = () => {
  const app = express()
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
