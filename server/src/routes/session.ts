import { Router } from 'express'
import { createSession, getAttendance } from '../controllers/session'

const router = Router()

router.get('/attendance/:sessionId', getAttendance)
router.post('/:courseId', createSession)

export default router
