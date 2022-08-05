import { Router } from 'express'
import {
  createCourse,
  getAttendance,
  getAllCourses,
} from '../controllers/course'
import { setUser } from '../middleware/setUser'
import { validateRefreshToken } from '../middleware/validateRefreshToken'

const router = Router()

router.post('/', validateRefreshToken, setUser, createCourse)
router.get('/', validateRefreshToken, setUser, getAllCourses)
router.get(
  '/attendance/:courseId',
  validateRefreshToken,
  setUser,
  getAttendance,
)

export default router
