import { Response } from 'express'
import { IRequest } from '../middleware/setUser'
import { AttendeeModel } from '../models/Attendee'
import { CourseModel } from '../models/Course'
import { SessionModel } from '../models/Session'
import { handleError } from './error'

export const createSession = async (req: IRequest, res: Response) => {
  try {
    const { name, start } = req.body
    const { courseId } = req.params
    const course = await CourseModel.findById(courseId)
    if (!course) throw new Error('Course not found')

    const session = new SessionModel({ name, start, course })
    await session.save()

    course.sessions.push(session._id)
    await course.save()

    res.status(201).send(session.toJSON())
  } catch (err) {
    handleError(req, res, err)
  }
}

export const getAttendance = async (req: IRequest, res: Response) => {
  try {
    const { sessionId } = req.params
    const session = await SessionModel.findById(sessionId).populate('course')
    if (!session) throw new Error('Session not found')
    console.log({ session })
    const attendees = await AttendeeModel.find({
      // @ts-ignore
      _id: { $in: session.course.attendees },
    })
    const attendance = attendees.map((attendee) => [
      attendee.name,
      attendee.attendance.includes(session._id),
    ])
    res.json(attendance)
  } catch (err) {
    handleError(req, res, err)
  }
}
