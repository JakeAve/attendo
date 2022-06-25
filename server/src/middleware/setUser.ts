import { Request, Response, NextFunction, request } from 'express'
import { handleError, NoJWTError } from '../controllers/error'
import { UserModel } from '../models/User'
import { signJwt, verifyJwt } from '../utils/jwt'

const authTokenCookie = 'auth_token'

export interface IUser {
  id?: string
  email: string
  displayName: string
}

export interface IRequest extends Request {
  user?: IUser
  token?: string
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
    const user = await UserModel.findOne({ email: verifiedJWT.payload.email })
    if (!user) throw new Error('Invalid user')
    req.user = user.toClient
    req.token = await signJwt(user.toClient)
    req.cookies(authTokenCookie, req.token, { httpOnly: true })
    next()
  } catch (err) {
    handleError(req, res, err)
  }
}
