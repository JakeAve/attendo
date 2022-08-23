import { Response } from 'express'
import { IRequest } from '../middleware/setUser'
import { UserModel, getPassword, IUser } from '../models/User'
import { handleError, InvalidCredentialsError } from '../handlers/errorHandler'
import * as bcrypt from 'bcrypt'
import { signJwt, signRefreshToken } from '../utils/jwt'
import { handleResponse } from '../handlers/responseHandler'
import { refreshTokenKey } from '../middleware/validateRefreshToken'

export const login = async (req: IRequest, res: Response) => {
  try {
    const { email, password } = req.body

    const participant = await UserModel.findOne({ email })
    if (!participant) throw new InvalidCredentialsError('Invalid credentials')

    const correctPassword = await bcrypt.compare(
      password,
      getPassword(participant as unknown as IUser),
    )
    if (!correctPassword)
      throw new InvalidCredentialsError('Invalid credentials')

    const authToken = await signJwt(participant.toClient)
    const refreshToken = await signRefreshToken(participant.toClient)

    res.cookie(refreshTokenKey, refreshToken, { httpOnly: true })

    handleResponse(req, res, {
      data: participant.toClient,
      token: authToken,
    })
  } catch (err) {
    handleError(req, res, err)
  }
}

export const register = async (req: IRequest, res: Response) => {
  try {
    const participant = new UserModel(req.body)
    await participant.save()
    handleResponse(req, res, {
      data: participant.toClient,
      status: 201,
    })
  } catch (err) {
    handleError(req, res, err)
  }
}

export const logout = async (req: IRequest, res: Response) => {
  try {
    res.clearCookie(refreshTokenKey)
    handleResponse(req, res, { token: null })
  } catch (err) {
    handleError(req, res, err)
  }
}

export const refreshToken = async (req: IRequest, res: Response) => {
  try {
    handleResponse(req, res, {})
  } catch (err) {
    handleError(req, res, err)
  }
}
