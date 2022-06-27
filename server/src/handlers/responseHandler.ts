import { Response } from 'express'
import { IRequest } from '../middleware/setUser'

interface IResponseBody {
  message: string
  data: any
  token?: string
  type?: string
  code?: number
}

interface HandleResponseInput {
  data?: any
  status?: number
  token?: string | null
  message?: string
  type?: string
  code?: number
}

export const handleResponse = async (
  req: IRequest,
  res: Response,
  input: HandleResponseInput,
) => {
  const { data = {}, status = 200, token, message = 'ok', code, type } = input
  const body: IResponseBody = {
    message,
    data,
  }
  if (req.token && token === undefined) body.token = req.token
  if (token) body.token = token
  if (code) body.code = code
  if (type) body.type = type
  res.status(status).json(body)
}
