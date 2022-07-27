import { NextFunction, Response } from 'express'
import { IRequest } from './setUser'
import { SessionModel } from '../models/Session'
import {
  handleError,
  ResourceNotFoundError,
  ResourceTypes,
  UserIsNotAdmin,
} from '../handlers/errorHandler'
import { CourseModel } from '../models/Course'

export const isAdmin = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) throw new Error('No user')
    const { sessionId, courseId } = req.params
    if (sessionId) {
      const session = await SessionModel.findById(sessionId).populate('course')
      if (!session)
        throw new ResourceNotFoundError(
          'Session not found',
          sessionId,
          ResourceTypes.SESSION,
        )
      // @ts-ignore
      if (!session.course.admins.includes(req.user.id))
        throw new UserIsNotAdmin('User is not an admin')

      req.session = session
      // @ts-ignore
      req.course = session.course
      return next()
    } else if (courseId) {
      const course = await CourseModel.findById(courseId)
      if (!course)
        throw new ResourceNotFoundError(
          'Course not found',
          courseId,
          ResourceTypes.COURSE,
        )
      // @ts-ignore
      if (!course.admins.includes(req.user.id))
        throw new UserIsNotAdmin('User is not an admin')
      req.course = course
      return next()
    }
    throw new Error('No session or course')
  } catch (err) {
    handleError(req, res, err)
  }
}
