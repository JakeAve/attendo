import { Router } from 'express'
import { createCourse, getAttendance } from '../controllers/course'

const router = Router()

router.post('/', createCourse)
router.get('/attendance/:courseId', getAttendance)

export default router
