import { Response } from 'express'
import { IRequest } from '../middleware/setUser'
import { UserModel, getPassword, IUser } from '../models/User'
import { handleError, InvalidCredentials } from './error'
import * as bcrypt from 'bcrypt'

export const login = async (req: IRequest, res: Response) => {
  try {
    const { email, password } = req.body

    const participant = await UserModel.findOne({ email })
    if (!participant) throw new InvalidCredentials('Invalid credentials')

    const correctPassword = await bcrypt.compare(
      password,
      getPassword(participant as unknown as IUser),
    )
    if (!correctPassword) throw new InvalidCredentials('Invalid credentials')

    res.status(200).send(participant.toClient)
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
