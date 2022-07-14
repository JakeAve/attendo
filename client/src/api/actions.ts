import { IResponseBody } from '../../../server/src/handlers/responseHandler'

interface ActionResponse {
  success: boolean
  response: IResponseBody
}

interface LoginProps {
  email: string
  password: string
}

export const login = async (payload: LoginProps): Promise<ActionResponse> => {
  const res = await fetch(`/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok)
    return {
      success: false,
      response: json,
    }

  return {
    success: true,
    response: json,
  }
}

interface RegisterProps {
  displayName: string
  email: string
  password: string
  confirmPassword: string
}

export const register = async (
  payload: RegisterProps,
): Promise<ActionResponse> => {
  const res = await fetch(`/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const json = await res.json()
  if (!res.ok)
    return {
      success: false,
      response: json,
    }

  return {
    success: true,
    response: json,
  }
}

interface AttendByIdProps {
  attendeeId: string
  session: string
  code: string
}

export const attendById = async ({
  attendeeId,
  session,
  code,
}: AttendByIdProps) => {
  try {
    const res = await fetch(`/api/attendance/${attendeeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session, code }),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.message)
    return { success: true }
  } catch (err) {
    console.error(err)
    return { success: false }
  }
}
