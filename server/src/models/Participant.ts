import { Schema, model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import mongoose from 'mongoose'

export const ParticipantSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
      minLength: [3, 'Participant name must be at least 3 characters long'],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minLength: [3, 'Participant email must be at least 3 characters long'],
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be at least 8 characters long'],
      get: () => {
        console.log('password hidden by default')
        return undefined
      },
    },
  },
  {
    toJSON: { getters: true },
    timestamps: true,
  },
)

interface IParticipant extends mongoose.Document {
  password: string
  _confirmPassword: string
}

const getPassword = (participant: IParticipant) =>
  participant.get('password', null, { getters: false })

ParticipantSchema.virtual('confirmPassword')
  .get(function (this: IParticipant) {
    return this._confirmPassword
  })
  .set(function (this: IParticipant, value: string) {
    this._confirmPassword = value
  })

ParticipantSchema.pre('validate', function (next) {
  if (this.isNew && getPassword(this) !== this.confirmPassword)
    this.invalidate('confirmPassword', 'Passwords do not match')

  next()
})

ParticipantSchema.pre('save', async function (next) {
  if (this.isNew) {
    const pwdHash = await bcrypt.hash(getPassword(this), 10)
    this.password = pwdHash
    delete this._confirmPassword
    return next()
  }
  next()
})

export const ParticipantModel = model('Participant', ParticipantSchema)
