import { AuthenticationError } from 'apollo-server-express'
import { Request, Response } from './types'
import { SESS_NAME } from './config'
import { getRepository } from 'typeorm'
import { user } from './entity'
import * as bcrypt from 'bcryptjs'

export const attemptSignIn = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<user> => {
  const repository = getRepository(user)
  const matchingUser = await repository.findOne({
    email: email,
  })
  if (
    !matchingUser ||
    (matchingUser.password != null &&
      !(await bcrypt.compare(password, matchingUser.password)))
  ) {
    throw new AuthenticationError(
      'Incorrect email or password. Please try again.'
    )
  }
  return matchingUser
}

export const signOut = (req: Request, res: Response): Promise<boolean> =>
  new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err)
      res.clearCookie(SESS_NAME)
      resolve(true)
    })
  })
