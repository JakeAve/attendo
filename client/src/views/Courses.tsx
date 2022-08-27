import { useEffect, useState } from 'react'
import { useUserContext } from '../providers/UserProvider'
import { getCourses } from '../api/actions'
import { CourseLink } from '../components/CouseLink/CourseLink'
import { ICourse } from '../../../server/src/models/Course'

export const Courses = () => {
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
          <CourseLink key={course._id} {...course} />
        ))}
      </ul>
    </>
  )
}
