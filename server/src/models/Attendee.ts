import { Schema, model } from 'mongoose'
import { Collections } from './.collections'

interface Attendee {
  name: string
}

export const AttendeeSchema = new Schema<Attendee>({
  name: {
    type: String,
    required: true,
    minLength: [3, 'Participant name must be at least 3 characters long'],
  },
})

export const AttendeeModel = model(Collections.Attendee, AttendeeSchema)
