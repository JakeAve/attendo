import { useRef } from 'react'
import { useAttendForm } from './hooks/useAttendForm'

export interface AttendFormProps {
  type: 'text' | 'select'
  list?: string[]
  sessionId: string
  code: string
}

export const AttendForm = (props: AttendFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const { submit, fieldElements } = useAttendForm({ formRef, ...props })
  return (
    <form ref={formRef} onSubmit={submit}>
      {fieldElements}
      <button>Attend</button>
    </form>
  )
}
