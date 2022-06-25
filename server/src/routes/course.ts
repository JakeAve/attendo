import { Router } from 'express'
import { createCourse, getAttendance } from '../controllers/course'
import { setUser } from '../middleware/setUser'

const router = Router()

router.post('/', setUser, createCourse)
router.get('/attendance/:courseId', setUser, getAttendance)

export default router
