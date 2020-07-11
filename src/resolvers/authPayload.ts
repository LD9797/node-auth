import { IResolvers } from 'apollo-server-express'
import { signOut } from '../auth'

const resolvers: IResolvers = {
  Mutation: {
    login: async (_, { email, password }, context) => {
      const { user } = await context.authenticate('graphql-local', {
        email,
        password,
      })
      await context.login(user)
      return { user }
    },
    logout: async (_, __, context) => {
      const isSignedOut = await signOut(context.req, context.res)
      if (isSignedOut) {
        await context.logout()
      }
    },
  },
}

export default resolvers
