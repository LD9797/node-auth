import { IResolvers } from 'apollo-server-express'
import { user } from '../entity'
import { getRepository } from 'typeorm'

const resolvers: IResolvers = {
  Query: {
    me: async (_, __, ___, ____) => {
      const userRepository = getRepository(user)
      return await userRepository.find()
    },
  },
}

export default resolvers
