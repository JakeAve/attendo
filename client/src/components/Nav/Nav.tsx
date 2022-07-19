import { Link } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/attend">Attend</Link>
        </li>
        <li>
          <Link to="/login">Login / Register</Link>
        </li>
      </ul>
    </nav>
  )
}
