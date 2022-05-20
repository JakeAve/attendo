import { Schema, model, Document } from 'mongoose'
import { Collections } from './.collections'

interface IAttendee extends Document {
  name: string
}

export const AttendeeSchema = new Schema<IAttendee>({
  name: {
    type: String,
    required: [true, `Attendee's name is required`],
    minLength: [3, 'Participant name must be at least 3 characters long'],
  },
})

export const AttendeeModel = model(Collections.Attendee, AttendeeSchema)
