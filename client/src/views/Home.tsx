import { useEffect, useState } from 'react'
import { ICourse } from '../../../server/src/models/Course'
import { getCourses } from '../api/actions'
import { useUserContext } from '../providers/UserProvider'

export const Home = () => {
  const { user } = useUserContext()
  const [courses, setCourses] = useState<ICourse[]>([])

  useEffect(() => {
    if (user) {
      getCourses({ token: user.token })
        .then(({ response }) => {
          setCourses(response.data)
        })
        .catch(console.error)
    }
  }, [user])

  return (
    <>
      <h1>Welcome to Attendo, {user?.displayName}</h1>
      <p>Some segment of text</p>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>{course.name}</li>
        ))}
      </ul>
    </>
  )
}
