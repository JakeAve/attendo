import { Schema, model, Types, Document } from 'mongoose'
import { genEntryCode } from '../utils/genEntryCode'
import { Collections } from './.collections'

interface ISession extends Document {
  name: string
  code: string
  start: Date
  end?: Date
  course: Types.ObjectId
}

export const SessionSchema = new Schema<ISession>({
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
    default: Date.now,
  },
  end: {
    type: Date,
    validate: {
      validator: (date: Date) => {
        return date > (this as unknown as ISession).start
      },
      message: 'End time must be after start time',
    },
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: Collections.Course,
  },
})

export const SessionModel = model(Collections.Session, SessionSchema)
