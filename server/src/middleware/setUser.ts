import { Request, Response, NextFunction } from 'express'
import {
  BadRefreshTokenError,
  handleError,
  NoJWTError,
} from '../handlers/errorHandler'
import { ICourse } from '../models/Course'
import { ISession } from '../models/Session'
import { verifyJwt } from '../utils/jwt'

export const authTokenCookie = 'auth_token'

export interface IUser {
  id?: string // This id is a string, not an object id
  email: string
  displayName: string
}

export interface IRequest extends Request {
  user?: IUser
  token?: string
  session?: ISession
  course?: ICourse
}

export const setUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jwt = req.headers.authorization?.split(' ')[1]
    if (!jwt) throw new NoJWTError('No token')
    const verifiedJWT = await verifyJwt(jwt) // can throw JWSSignatureVerificationFailed error
    if (verifiedJWT.payload.email !== (req.user as IUser).email)
      throw new BadRefreshTokenError('Tokens do not match')
    next()
  } catch (err) {
    handleError(req, res, err)
  }
}
