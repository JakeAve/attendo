import { register } from '../../api/actions'
import { useForm } from '../../hooks/useForm'

interface LoginProps {
  selectedIdx: number
  idx: number
}

export const Login = (props: LoginProps) => {
  const { selectedIdx, idx } = props

  const onSubmit = async (data: any) => {
    try {
      const stuff = await register(data)
    } catch (err) {
      console.error(err)
    }
  }
  const { submit } = useForm({
    onSubmit,
  })
  return (
    <form hidden={selectedIdx !== idx} onSubmit={submit}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" />
      <button type="submit">Login</button>
    </form>
  )
}
