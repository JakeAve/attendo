import { Response } from 'express'
import { IRequest } from '../middleware/setUser'
import { UserModel, getPassword, IUser } from '../models/User'
import { handleError, InvalidCredentialsError } from './error'
import * as bcrypt from 'bcrypt'
import { signJwt } from '../utils/jwt'

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
    const payload = { ...participant.toClient, authToken }
    res.status(200).send(payload)
  } catch (err) {
    handleError(req, res, err)
  }
}

export const register = async (req: IRequest, res: Response) => {
  try {
    const participant = new UserModel(req.body)
    await participant.save()
    res.status(201).send(participant.toClient)
  } catch (err) {
    handleError(req, res, err)
  }
}
