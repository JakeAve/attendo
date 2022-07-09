import { useRef } from 'react'
import { FieldInputs } from '../../../hooks/useForm'
import { useSignUp } from './hooks/useSignUp'

interface SignUpProps {
  selectedIdx: number
  idx: number
}

const formFields: FieldInputs = [
  {
    label: 'Display name',
    name: 'displayName',

    type: 'text',
    placeholder: 'Enter your display name',
    required: true,
    criteria: [
      [(value: string) => !!value, 'Display name is required'],
      [(value: string) => value.length < 20, 'Display name is too long'],
      [(value: string) => value.length > 3, 'Display name is too short'],
    ],
  },
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
    criteria: [
      [(value: string) => !!value, 'Password is required'],
      [(value: string) => value.length < 30, 'Password is too long'],
      [(value: string) => value.length >= 8, 'Password is too short'],
      [
        (value: string) => /[a-z]/.test(value),
        'Password must contain a lowercase letter',
      ],
      [
        (value: string) => /[A-Z]/.test(value),
        'Password must contain an uppercase letter',
      ],
      [(value: string) => /\d/.test(value), 'Password must contain a number'],
      [
        (value: string) => /[^a-zA-Z0-9]/.test(value),
        'Password must contain a special character',
      ],
    ],
  },
  {
    label: 'Confirm password',
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm your password',
    required: true,
    criteria: [
      [(value: string) => !!value, 'Confirmation is required'],
      [
        (value, data: any) => data['password'] === value,
        'Passwords do not match',
      ],
    ],
  },
]

export const SignUp = (props: SignUpProps) => {
  const { selectedIdx, idx } = props
  const formRef = useRef<HTMLFormElement>(null)
  const { submit, change, fieldElements } = useSignUp({ formFields, formRef })

  return (
    <form
      hidden={selectedIdx !== idx}
      onSubmit={submit}
      onChange={change}
      ref={formRef}
    >
      {fieldElements}
      <button type="submit">Sign up</button>
    </form>
  )
}
