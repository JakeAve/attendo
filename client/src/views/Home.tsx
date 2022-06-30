import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <>
      <h1>Welcome to Attendo</h1>
      <p>Some segment of text</p>
      <Link to="/attend">Attend</Link>
      <Link to="/login">Login / Register</Link>
    </>
  )
}
