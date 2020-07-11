import { Request, Response } from './types'
import { SESS_NAME } from './config'

export const signOut = (req: Request, res: Response): Promise<boolean> =>
  new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err)
      res.clearCookie(SESS_NAME)
      resolve(true)
    })
  })
