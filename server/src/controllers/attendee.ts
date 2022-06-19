import { Response } from 'express'
import { IRequest } from '../middleware/setUser'
import { AttendeeModel } from '../models/Attendee'
import { CourseModel } from '../models/Course'
import { SessionModel } from '../models/Session'
import { handleError, ResourceNotFoundError, ResourceTypes } from './error'

export const attendByAttendeeId = async (req: IRequest, res: Response) => {
  try {
    const { attendeeId } = req.params
    const { session: sessionId, code } = req.body
    const session = await SessionModel.findById(sessionId as String)
    if (!session)
      throw new ResourceNotFoundError(
        'Session not found',
        sessionId,
        ResourceTypes.SESSION,
      )

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

export const attendAsNewAttendee = async (req: IRequest, res: Response) => {
  try {
    const { session: sessionId, code, name } = req.body
    const session = await SessionModel.findById(sessionId as String)
    if (!session)
      throw new ResourceNotFoundError(
        'Session not found',
        sessionId,
        ResourceTypes.SESSION,
      )

    if (code !== session.code) throw new Error('Invalid session code')

    if (session.end && session.end < new Date())
      throw new Error('Session has ended')

    if (session.start && session.start > new Date())
      throw new Error('Session has not started')

    const course = await CourseModel.findById(session.course).populate(
      'attendees',
    )
    if (!course)
      throw new ResourceNotFoundError(
        'Course not found',
        session.course.toString(),
        ResourceTypes.COURSE,
      )

    // @ts-ignore
    if (course.attendees.find((attendee) => attendee.name === name))
      throw new Error('Attendee already exists')

    const attendee = new AttendeeModel({
      name,
      course: session.course,
      attendance: [session._id],
    })
    await attendee.save()

    course.attendees.push(attendee._id)
    await course.save()

    res.status(201).send(attendee.toJSON())
  } catch (err) {
    handleError(req, res, err)
  }
}

export const getAttendance = async (req: IRequest, res: Response) => {
  try {
    const { attendeeId } = req.params
    const attendee = await AttendeeModel.findById(attendeeId).populate(
      'attendance',
    )
    if (!attendee)
      throw new ResourceNotFoundError(
        'Attendee not found',
        attendeeId,
        ResourceTypes.ATTENDEE,
      )
    res.json(attendee.attendance)
  } catch (err) {
    handleError(req, res, err)
  }
}

export const updateAttendeeName = async (req: IRequest, res: Response) => {
  try {
    const { attendeeId } = req.params
    const { name } = req.body
    const attendee = await AttendeeModel.findById(attendeeId)
    if (!attendee)
      throw new ResourceNotFoundError(
        'Attendee not found',
        attendeeId,
        ResourceTypes.ATTENDEE,
      )
    attendee.name = name
    await attendee.save()
    res.json(attendee.toJSON())
  } catch (err) {
    handleError(req, res, err)
  }
}
