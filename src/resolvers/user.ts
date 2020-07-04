import { IResolvers } from 'apollo-server-express'

const resolvers: IResolvers = {
  Query: {
    me: (_, __, ___, ____) => {
      return {
        id: 1,
        name: 'name',
        createdAt: 'Created',
        updatedAt: 'updated',
      }
    },
  },
}

export default resolvers
