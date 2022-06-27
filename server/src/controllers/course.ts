import { Response } from 'express'
import { IRequest } from '../middleware/setUser'
import { AttendeeModel } from '../models/Attendee'
import { CourseModel } from '../models/Course'
import { UserModel } from '../models/User'
import {
  handleError,
  ResourceNotFoundError,
  ResourceTypes,
} from '../handlers/errorHandler'
import { handleResponse } from '../handlers/responseHandler'

export const createCourse = async (req: IRequest, res: Response) => {
  try {
    const { name, attendees = [], admins = [] } = req.body
    const adminIds = ['6286cc528e5883ecc78861ac', ...admins]
    const adminRecords = await UserModel.find({ _id: { $in: adminIds } })
    const course = new CourseModel({
      name,
      admins: adminRecords,
    })

    const attendeeObjs = attendees.map((name: string) => ({ name, course }))
    const attendeeRecords = await AttendeeModel.insertMany(attendeeObjs)
    course.attendees = attendeeRecords.map((attendee) => attendee._id)

    await course.save()
    handleResponse(req, res, { data: course.toJSON(), status: 201 })
  } catch (err) {
    handleError(req, res, err)
  }
}

interface ISessions {
  [key: string]: string[]
}

interface ICourseAttendance {
  [key: string]: [string, boolean][]
}

export const getAttendance = async (req: IRequest, res: Response) => {
  try {
    const { courseId } = req.params
    const course = await CourseModel.findById(courseId).populate('attendees')
    if (!course)
      throw new ResourceNotFoundError(
        'Course not found',
        courseId,
        ResourceTypes.COURSE,
      )
    const sessions: ISessions = {}
    for (const attendee of course.attendees) {
      // @ts-ignore
      for (const session of attendee.attendance) {
        if (sessions[session._id]) {
          // @ts-ignore
          sessions[session._id].push(attendee.name)
          // @ts-ignore
        } else sessions[session._id] = [attendee.name]
      }
    }
    const attendance: ICourseAttendance = {}
    for (const [sessionId, names] of Object.entries(sessions)) {
      attendance[sessionId] = names.map((name) => [name, true])
      for (const attendee of course.attendees) {
        // @ts-ignore
        if (!names.includes(attendee.name)) {
          // @ts-ignore
          attendance[sessionId].push([attendee.name, false])
        }
      }
    }
    handleResponse(req, res, { data: course.toJSON() })
  } catch (err) {
    handleError(req, res, err)
  }
}
