import { IResolvers } from 'apollo-server-express'

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
  },
}

export default resolvers
