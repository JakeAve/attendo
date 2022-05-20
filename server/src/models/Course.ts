import { Schema, model, Document, Types } from 'mongoose'
import { Collections } from './.collections'

interface ICourse extends Document {
  name: string
  attendees: Types.ObjectId[]
  admins: Types.ObjectId[]
  sessions: Types.ObjectId[]
}

export const CourseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    minLength: [3, 'Course name must be at least 3 characters long'],
  },
  attendees: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: Collections.Attendee,
      },
    ],
    default: [],
  },
  admins: [{ type: Schema.Types.ObjectId, ref: Collections.User }],
  sessions: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: Collections.Session,
      },
    ],
    default: [],
  },
})

export const CourseModel = model(Collections.Course, CourseSchema)
