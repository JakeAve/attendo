import { Link } from 'react-router-dom'
import { ICourse } from '../../../../server/src/models/Course'

export const CourseLink = (props: Partial<ICourse>) => {
  const { name, _id } = props

  return (
    <li>
      <Link to={`/course/${_id}`}>{name}</Link>
    </li>
  )
}
