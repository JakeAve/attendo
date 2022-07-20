import { Link } from 'react-router-dom'
import { routes } from '../../routes'

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={routes.home}>Home</Link>
        </li>
        <li>
          <Link to={routes.attendSession}>Mark Attendance</Link>
        </li>
        <li>
          <Link to={routes.login}>Login / Register</Link>
        </li>
      </ul>
    </nav>
  )
}
