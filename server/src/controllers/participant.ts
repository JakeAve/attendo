import { ParticipantModel } from '../models/Participant'

import { Request, Response } from 'express'

export const createParticipant = async (req: Request, res: Response) => {
  try {
    const { displayName, email, password, confirmPassword } = req.body
    const participant = new ParticipantModel({
      displayName,
      email,
      password,
      confirmPassword,
    })
    await participant.save()
    res.status(201).send(participant)
  } catch (err) {
    console.error(err)
    res.status(400).send(err)
  }
}
