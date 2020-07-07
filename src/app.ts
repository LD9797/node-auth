import 'reflect-metadata'
import express from 'express'
import session from 'express-session'
import { ApolloServer } from 'apollo-server-express'
import { APOLLO_OPTIONS, SESS_OPTIONS } from './config'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { createConnection } from 'typeorm'
import passport from 'passport'
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport'
import { user } from './entity'
import { getRepository } from 'typeorm'
import * as bcrypt from 'bcryptjs'

const createApp = async (store?: session.Store) => {
  await createConnection().then(() => console.log('Connected to MySQL'))

  passport.use(
    new GraphQLLocalStrategy(
      async (
        email: any,
        password: any,
        done: (arg0: undefined | Error, arg1: any) => void
      ) => {
        let found = true
        const repository = getRepository(user)
        const matchingUser = await repository.findOne({
          email: email,
        })
        if (matchingUser) {
          if (matchingUser.password != null) {
            const valid = await bcrypt.compare(password, matchingUser.password)
            if (!valid) {
              found = false
            }
          }
        }
        const error = found ? undefined : new Error('No matching user')
        done(error, matchingUser)
      }
    )
  )

  const app = express()
  app.use(passport.initialize())
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
      connection ? connection.context : buildContext({ req, res }),
  })
  server.applyMiddleware({ app, cors: false })
  return { app, server }
}

export default createApp
