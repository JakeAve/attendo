import { NextFunction, Response } from 'express'
import { BadRefreshTokenError, handleError } from '../handlers/errorHandler'
import { UserModel } from '../models/User'
import { signJwt, verifyRefreshToken } from '../utils/jwt'
import { IRequest } from './setUser'

export const refreshTokenKey = 'refresh_token'

export const validateRefreshToken = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies[refreshTokenKey]
    if (!refreshToken) throw new BadRefreshTokenError('No refresh token')
    const verifiedRefreshToken = await verifyRefreshToken(refreshToken).catch(
      () => {
        throw new BadRefreshTokenError('Bad refresh token')
      },
    )
    const user = await UserModel.findOne({
      email: verifiedRefreshToken.payload.email,
    })
    if (!user) throw new Error('Invalid user')
    req.user = user
    req.token = await signJwt(user.toClient)
    next()
  } catch (err) {
    res.clearCookie(refreshTokenKey)
    handleError(req, res, err)
  }
}
