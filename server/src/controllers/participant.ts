import { ParticipantModel } from '../models/Participant'

import { Request, Response } from 'express'

export const createParticipant = async (req: Request, res: Response) => {
  try {
    const participant = new ParticipantModel(req.body)
    await participant.save()
    res.status(201).send(participant.toClient)
  } catch (err) {
    console.error(err)
    res.status(400).send(err)
  }
}
