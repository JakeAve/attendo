import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Login as LoginForm } from '../components/forms/Login'
import { SignUp as SignupForm } from '../components/forms/SignUp'

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
