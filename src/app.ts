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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { user } from './entity'
import { attemptSignIn } from './auth'
import schemaDirectives from './directives'

const createApp = async (store?: session.Store) => {
  await createConnection().then(() => console.log('Connected to MySQL'))

  passport.use(
    new GraphQLLocalStrategy(async (email: any, password: any, done: any) => {
      // TODO: Implement one session per user filter
      // This is just a test
      try {
        const matchingUser = await attemptSignIn({ email, password })
        done(null, matchingUser)
      } catch (error) {
        done(error, null)
      }
    })
  )

  // used to serialize the user for the session
  passport.serializeUser((user: user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  const app = express()
  const sessionHandler = session({
    store,
    ...SESS_OPTIONS,
  })
  app.use(sessionHandler)
  app.use(passport.initialize())
  app.use(passport.session())
  const server = new ApolloServer({
    ...APOLLO_OPTIONS,
    typeDefs,
    resolvers,
    schemaDirectives,
    context: ({ req, res }) => buildContext({ req, res }),
    debug: false,
  })
  server.applyMiddleware({ app, cors: false })
  return { app, server }
}

export default createApp
