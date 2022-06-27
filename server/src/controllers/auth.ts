import { Response } from 'express'
import { IRequest, authTokenCookie } from '../middleware/setUser'
import { UserModel, getPassword, IUser } from '../models/User'
import { handleError, InvalidCredentialsError } from '../handlers/errorHandler'
import * as bcrypt from 'bcrypt'
import { signJwt } from '../utils/jwt'
import { handleResponse } from '../handlers/responseHandler'

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
    res.clearCookie(authTokenCookie)
    handleResponse(req, res, { token: null })
  } catch (err) {
    handleError(req, res, err)
  }
}
