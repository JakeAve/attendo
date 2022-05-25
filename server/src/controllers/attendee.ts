import { Response } from 'express'
import { IRequest } from '../middleware/setUser'
import { AttendeeModel } from '../models/Attendee'
import { SessionModel } from '../models/Session'
import { handleError } from './error'

export const attendByAttendeeId = async (req: IRequest, res: Response) => {
  try {
    const { attendeeId } = req.params
    const { session: sessionId, code } = req.body
    const session = await SessionModel.findById(sessionId as String)
    if (!session) throw new Error('Session not found')

    if (code !== session.code) throw new Error('Invalid session code')

    if (session.end && session.end < new Date())
      throw new Error('Session has ended')

    if (session.start && session.start > new Date())
      throw new Error('Session has not started')

    const attendee = await AttendeeModel.findById(attendeeId)
    if (!attendee) throw new Error('Attendee not found')

    if (!session.course.equals(attendee.course))
      throw new Error('Attendee not associated with course')

    if (!attendee.attendance.includes(session._id)) {
      // don't add attendance if already there
      attendee.attendance.push(session._id)
      await attendee.save()
    }

    res.status(201).send(attendee.toJSON())
  } catch (err) {
    handleError(req, res, err)
  }
}
