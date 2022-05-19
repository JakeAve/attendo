import { Schema, model } from 'mongoose'
import { Collections } from './.collections'

interface Course {
  name: string
  attendees: object[]
  admins: object[]
  sessions: object[]
}

export const CourseSchema = new Schema<Course>({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    minLength: [3, 'Course name must be at least 3 characters long'],
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: Collections.Attendee,
    },
  ],
  admins: [{ type: Schema.Types.ObjectId, ref: Collections.User }],
  sessions: [
    {
      type: Schema.Types.ObjectId,
      ref: Collections.Session,
    },
  ],
})

export const CourseModel = model(Collections.Course, CourseSchema)
