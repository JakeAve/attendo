import { Response } from 'express'
import { IRequest } from '../middleware/setUser'
import { AttendeeModel } from '../models/Attendee'
import { CourseModel } from '../models/Course'
import { UserModel } from '../models/User'
import { handleError } from './error'

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
    res.status(201).send(course.toJSON())
  } catch (err) {
    handleError(req, res, err)
  }
}
