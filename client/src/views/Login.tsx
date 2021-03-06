import { useState } from 'react'
import { Login as LoginForm } from '../components/forms/Login/Login'
import { SignUp as SignupForm } from '../components/forms/SignUp/SignUp'

export const Login = () => {
  const [selectedIdx, setSelectedIdx] = useState(0)
  return (
    <div>
      <button onClick={() => setSelectedIdx(0)}>Login</button>
      <button onClick={() => setSelectedIdx(1)}>Sign up</button>
      <div>
        <LoginForm selectedIdx={selectedIdx} idx={0} />
        <SignupForm selectedIdx={selectedIdx} idx={1} />
      </div>
    </div>
  )
}
