import { Response } from 'express'
import { IRequest } from '../middleware/setUser'
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
