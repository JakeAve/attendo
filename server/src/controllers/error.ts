import { Response } from 'express'
import { IRequest } from '../middleware/setUser'
import { Error as MongooseErrorNamespace } from 'mongoose'

interface IErrorReport {
  type: ErrorTypes
  code: ErrorCode
  message: string
  data: UserInputErrorData | {}
}

interface UserInputErrorData {
  fields: [string, string][]
}

interface IUserInputErrorReport extends IErrorReport {
  type: ErrorTypes.USER_INPUT
  data: UserInputErrorData
}

enum ErrorCode {
  INTERNAL_SEVER_ERROR = 1,
  MONGOOSE_VALIDATION_ERROR = 2,
  MONGOOSE_VERSION_ERROR = 3,
  MONGOOSE_CONNECTION_ERROR = 4,
  MONGOOSE_DUPLICATE_KEY = 5,
  INVALID_CREDENTIALS = 6,
}

enum ErrorTypes {
  USER_INPUT = 'USER_INPUT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

interface DupeKey {
  code: number
  keyPattern: {
    [key: string]: 1
  }
}

export class InvalidCredentials extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, InvalidCredentials.prototype)
  }
}

export const handleError = async (
  req: IRequest,
  res: Response,
  error: unknown,
) => {
  console.log({
    catchingError: (error as Error).message,
    user: req.user,
  })
  if (error instanceof MongooseErrorNamespace.ValidationError) {
    const fields = Object.values(error.errors).map(
      (err) => [err.path, err.message] as [string, string],
    )
    const report: IUserInputErrorReport = {
      type: ErrorTypes.USER_INPUT,
      code: ErrorCode.MONGOOSE_VALIDATION_ERROR,
      message: 'Validation Error',
      data: { fields },
    }
    return res.status(400).send(report)
  }

  if (error instanceof InvalidCredentials) {
    const report: IUserInputErrorReport = {
      type: ErrorTypes.USER_INPUT,
      code: ErrorCode.INVALID_CREDENTIALS,
      message: error.message,
      data: {
        fields: [
          ['email', 'Invalid credentials'],
          ['password', 'Invalid credentials'],
        ],
      },
    }
    return res.status(400).send(report)
  }

  if ((error as DupeKey).code === 11000) {
    const keyPattern = (error as DupeKey).keyPattern
    const key = Object.keys(keyPattern)[0]
    const message = `${key} already exists`
    const report: IUserInputErrorReport = {
      type: ErrorTypes.USER_INPUT,
      message,
      code: ErrorCode.MONGOOSE_DUPLICATE_KEY,
      data: {
        fields: [[key, message]],
      },
    }
    return res.status(400).send(report)
  }

  console.error(error)
  const report: IErrorReport = {
    type: ErrorTypes.INTERNAL_SERVER_ERROR,
    code: ErrorCode.INTERNAL_SEVER_ERROR,
    message: 'Internal server error',
    data: {},
  }
  res.status(500).send(report)
}
