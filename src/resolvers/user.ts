import { IResolvers } from 'apollo-server-express'
import { user } from '../entity'
import { getRepository, getManager } from 'typeorm'
import { signUp } from '../validators'
import * as bcrypt from 'bcryptjs'

const resolvers: IResolvers = {
  Query: {
    users: async (_, __, ___, ____) => {
      const userRepository = getRepository(user)
      return await userRepository.find()
    },
  },
  Mutation: {
    signUp: async (_, args: any, ___, ____) => {
      await signUp.validateAsync(args, { abortEarly: false })
      args.password = await bcrypt.hash(args.password, 10)
      const entityManager = getManager()
      const newUser = user.create({ ...args })
      await entityManager.save(newUser)
      return newUser
    },
  },
}

export default resolvers
