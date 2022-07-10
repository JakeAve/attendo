import { useRef } from 'react'
import { FieldInputs } from '../../../hooks/useForm'
import { useAttendForm } from './hooks/useAttendForm'

const formFields: FieldInputs = [
  {
    label: 'Enter Session ID',
    name: 'sessionId',
    type: 'text',
    placeholder: 'Enter Session ID',
    required: true,
    criteria: [[(value: string) => !!value, 'Session ID is required']],
  },
]

export const Login = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const { submit, change, fieldElements } = useAttendForm({
    formFields,
    formRef,
  })

  return (
    <>
      <form onSubmit={submit} onChange={change} ref={formRef}>
        {fieldElements}
        <button type="submit">Attend</button>
      </form>
    </>
  )
}
