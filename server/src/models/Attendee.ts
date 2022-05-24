import { Schema, model, Document, Types } from 'mongoose'
import { Collections } from './.collections'

interface IAttendee extends Document {
  name: string
  attendance: Types.ObjectId[]
  course: Types.ObjectId
}

export const AttendeeSchema = new Schema<IAttendee>({
  name: {
    type: String,
    required: [true, `Attendee's name is required`],
    minLength: [3, 'Participant name must be at least 3 characters long'],
  },
  attendance: {
    type: [{ type: Schema.Types.ObjectId, ref: Collections.Session }],
    default: [],
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: Collections.Course,
    required: [true, 'Attendee must be associated with a course'],
  },
})

export const AttendeeModel = model(Collections.Attendee, AttendeeSchema)
