import { Schema, model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { Collections } from './.collections'

// don't export this User, use IUser
interface User {
  displayName: string
  email: string
  password: string
  toClient: {
    displayName: string
    email: string
  }
}

export const UserSchema = new Schema<User>(
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

export interface IUser extends mongoose.Document {
  displayName: string
  email: string
  password: string
  _confirmPassword: string // placeholder
  confirmPassword: string // virtual field
}

export const getPassword = (participant: IUser) =>
  participant.get('password', null, { getters: false })

UserSchema.virtual('confirmPassword')
  .get(function (this: IUser) {
    return this._confirmPassword
  })
  .set(function (this: IUser, value: string) {
    this._confirmPassword = value
  })

UserSchema.virtual('toClient').get(function (this: IUser) {
  return { displayName: this.displayName, email: this.email }
})

UserSchema.pre('validate', function (this: IUser, next) {
  if (this.isNew && getPassword(this) !== this.confirmPassword)
    this.invalidate('confirmPassword', 'Passwords do not match')

  next()
})

UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    const pwdHash = await bcrypt.hash(getPassword(this), 10)
    this.password = pwdHash
    delete this._confirmPassword
    return next()
  }
  next()
})

export const UserModel = model(Collections.User, UserSchema)
