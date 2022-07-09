import { useRef } from 'react'
import { FieldInputs } from '../../../hooks/useForm'
import { useLogin } from './hooks/useLogin'

interface LoginProps {
  selectedIdx: number
  idx: number
}

const formFields: FieldInputs = [
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    criteria: [
      [(value: string) => !!value, 'Email is required'],
      [
        (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        'Email is invalid',
      ],
    ],
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
    criteria: [[(value: string) => !!value, 'Password is required']],
  },
]

export const Login = (props: LoginProps) => {
  const { selectedIdx, idx } = props
  const formRef = useRef<HTMLFormElement>(null)

  const { submit, change, fieldElements } = useLogin({ formFields, formRef })

  return (
    <>
      <form
        hidden={selectedIdx !== idx}
        onSubmit={submit}
        onChange={change}
        ref={formRef}
      >
        {fieldElements}
        <button type="submit">Login</button>
      </form>
    </>
  )
}
