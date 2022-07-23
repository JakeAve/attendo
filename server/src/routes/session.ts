import { Router } from 'express'
import {
  createSession,
  getAttendance,
  updateSession,
  getSessionByHash,
} from '../controllers/session'
import { setUser } from '../middleware/setUser'

const router = Router()

router.get('/attendance/:sessionId', setUser, getAttendance)
router.post('/:courseId', setUser, createSession)
router.put('/:sessionId', setUser, updateSession)
router.get('/by-hash/:hash', getSessionByHash)

export default router
