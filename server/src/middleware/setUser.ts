import { Request, Response, NextFunction } from 'express'

export interface IUser {
  id?: string
  email: string
  displayName: string
}

export interface IRequest extends Request {
  user?: IUser
  token?: string
}

export const setUser = (req: Request, res: Response, next: NextFunction) => {
  if (!(req as unknown as IRequest).user) {
    const { email, displayName } = req.body
    const user: IUser = {
      id: undefined,
      email,
      displayName,
    }
    ;(req as unknown as IRequest).user = user
  }

  next()
}
