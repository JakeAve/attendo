import { Schema, model, Types, Document } from 'mongoose'
import { genEntryCode } from '../utils/genEntryCode'
import { Collections } from './.collections'
import crypto from 'crypto'
import { generateHash } from '../utils/generateHash'

interface ISession extends Document {
  name: string
  code: string
  hash: string
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
  hash: {
    type: String,
    required: true,
    default: function () {
      return generateHash({ sessionId: this._id.toString(), code: this.code })
    },
  },
  start: {
    type: Date,
    required: true,
    default: Date.now,
  },
  end: {
    type: Date,
    validate: {
      validator: function (date: Date) {
        return date.getTime() > (this as unknown as ISession).start.getTime()
      },
      message: 'End time must be after start time',
    },
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: Collections.Course,
  },
})

SessionSchema.pre('save', function (next) {
  this.hash = generateHash({ sessionId: this._id.toString(), code: this.code })
  next()
})

export const SessionModel = model(Collections.Session, SessionSchema)
