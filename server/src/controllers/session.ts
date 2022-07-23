import { Response } from 'express'
import { IRequest } from '../middleware/setUser'
import { AttendeeModel } from '../models/Attendee'
import { CourseModel } from '../models/Course'
import { SessionModel } from '../models/Session'
import {
  handleError,
  ResourceNotFoundError,
  ResourceTypes,
} from '../handlers/errorHandler'
import { handleResponse } from '../handlers/responseHandler'

export const createSession = async (req: IRequest, res: Response) => {
  try {
    const { name, start } = req.body
    const { courseId } = req.params
    const course = await CourseModel.findById(courseId)
    if (!course)
      throw new ResourceNotFoundError(
        'Course not found',
        courseId,
        ResourceTypes.COURSE,
      )

    const session = new SessionModel({ name, start, course })
    await session.save()

    course.sessions.push(session._id)
    await course.save()

    handleResponse(req, res, { data: session.toJSON(), status: 201 })
  } catch (err) {
    handleError(req, res, err)
  }
}

export const getAttendance = async (req: IRequest, res: Response) => {
  try {
    const { sessionId } = req.params
    const session = await SessionModel.findById(sessionId).populate('course')
    if (!session)
      throw new ResourceNotFoundError(
        'Session not found',
        sessionId,
        ResourceTypes.SESSION,
      )
    const attendees = await AttendeeModel.find({
      // @ts-ignore
      _id: { $in: session.course.attendees },
    })
    const attendance = attendees.map((attendee) => [
      attendee.name,
      attendee.attendance.includes(session._id),
    ])
    handleResponse(req, res, { data: attendance })
  } catch (err) {
    handleError(req, res, err)
  }
}

export const updateSession = async (req: IRequest, res: Response) => {
  try {
    const { sessionId } = req.params
    const { name, code, start, end } = req.body
    const session = await SessionModel.findById(sessionId)
    if (!session)
      throw new ResourceNotFoundError(
        'Session not found',
        sessionId,
        ResourceTypes.SESSION,
      )

    if (name) session.name = name
    if (code) session.code = code
    if (start) session.start = new Date(start)
    if (end) session.end = new Date(end)

    await session.save()
    handleResponse(req, res, { data: session.toJSON() })
  } catch (err) {
    handleError(req, res, err)
  }
}

export const getSessionByHash = async (req: IRequest, res: Response) => {
  try {
    const { hash } = req.params
    const session = await SessionModel.findOne({ hash })
    if (!session)
      throw new ResourceNotFoundError(
        'Session not found',
        hash,
        ResourceTypes.SESSION,
      )

    // const attendees = await AttendeeModel.find({
    //   // @ts-ignore
    //   _id: { $in: session.course.attendees },
    // })
    const data = {
      type: 'text',
      code: session.code,
      sessionId: session._id,
    }
    handleResponse(req, res, { data })
  } catch (err) {
    handleError(req, res, err)
  }
}
