import { Request, Response } from 'express'
import { Error as MongooseErrorNamespace } from 'mongoose'

interface IErrorReport {
  code: ErrorCode
  message: string
  data: any
}

enum ErrorCode {
  MONGOOSE_VALIDATION_ERROR = 2,
  MONGOOSE_VERSION_ERROR = 3,
  MONGOOSE_CONNECTION_ERROR = 4,
  MONGOOSE_DUPLICATE_KEY = 5,
  INTERNAL_SEVER_ERROR = 1,
}

interface DupeKey {
  code: number
  keyPattern: {
    [key: string]: 1
  }
}

export const handleError = async (
  req: Request,
  res: Response,
  error: unknown,
) => {
  if (error instanceof MongooseErrorNamespace.ValidationError) {
    const fields = Object.values(error.errors).map((err) => [
      err.path,
      err.message,
    ])
    const report: IErrorReport = {
      code: ErrorCode.MONGOOSE_VALIDATION_ERROR,
      message: 'Validation Error',
      data: { fields },
    }
    return res.status(400).send(report)
  }

  if ((error as DupeKey).code === 11000) {
    const keyPattern = (error as DupeKey).keyPattern
    const key = Object.keys(keyPattern)[0]
    const message = `${key} already exists`
    const report: IErrorReport = {
      message,
      code: ErrorCode.MONGOOSE_DUPLICATE_KEY,
      data: {
        key,
      },
    }
    return res.status(400).send(report)
  }

  const report: IErrorReport = {
    code: ErrorCode.INTERNAL_SEVER_ERROR,
    message: 'Internal server error',
    data: {},
  }
  res.status(500).send(report)
}
