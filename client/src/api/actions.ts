import { IResponseBody } from '../../../server/src/handlers/responseHandler'

interface LoginProps {
  email: string
  password: string
}

export const login = async (payload: LoginProps) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Invalid credentials')
  return res.json()
}

interface RegisterProps {
  displayName: string
  email: string
  password: string
  confirmPassword: string
}

export const register = async (payload: RegisterProps) => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  return res.json()
}
