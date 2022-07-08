import { login } from '../../api/actions'
import { FieldInputs, useForm } from '../../hooks/useForm'
import { useDialogContext } from '../../providers/DialogProvider'

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
  const { openDialog, closeDialog } = useDialogContext()

  const onSubmit = async (data: any) => {
    try {
      const stuff = await login(data)
    } catch (err) {
      console.error(err)
      openDialog({
        title: 'Could not login',
        content: 'Something went wrong',
      })
    }
  }

  const { submit, change, fieldElements } = useForm({
    onSubmit,
    fields: formFields,
  })

  return (
    <>
      <form hidden={selectedIdx !== idx} onSubmit={submit} onChange={change}>
        {fieldElements}
        <button type="submit">Login</button>
      </form>
    </>
  )
}
