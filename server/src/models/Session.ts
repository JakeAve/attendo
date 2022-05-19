import { Schema, model } from 'mongoose'
import { genEntryCode } from '../utils/genEntryCode'
import { Collections } from './.collections'

interface Session {
  date: Date
  name: string
  code: string
  start: Date
  end: Date
  attendance: [object, boolean][]
}

export const SessionSchema = new Schema<Session>({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
    minLength: [3, 'Session name must be at least 3 characters long'],
    default: () => new Date().toDateString(),
  },
  code: {
    type: String,
    required: true,
    default: () => genEntryCode(),
  },
  start: {
    type: Date,
    required: true,
    default: (this as unknown as Session).date,
  },
  end: {
    type: Date,
    required: true,
    validate: {
      validator: (date: Date) => {
        return date > (this as unknown as Session).start
      },
      message: 'End time must be after start time',
    },
  },
  attendance: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: Collections.Attendee,
      },
      Boolean,
    ],
    default: [],
  },
})

export const SessionModel = model(Collections.Session, SessionSchema)
