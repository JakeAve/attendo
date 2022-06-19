import { Router } from 'express'
import {
  createSession,
  getAttendance,
  updateSession,
} from '../controllers/session'

const router = Router()

router.get('/attendance/:sessionId', getAttendance)
router.post('/:courseId', createSession)
router.put('/:sessionId', updateSession)

export default router
