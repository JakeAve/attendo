import { Router } from 'express'
import {
  createSession,
  getAttendance,
  updateSession,
  getSessionByHash,
  getHash,
} from '../controllers/session'
import { isAdmin } from '../middleware/admin'
import { setUser } from '../middleware/setUser'

const router = Router()

router.get('/attendance/:sessionId', setUser, getAttendance)
router.post('/:courseId', setUser, isAdmin, createSession)
router.put('/:sessionId', setUser, updateSession)
router.get('/by-hash/:hash', getSessionByHash)
router.get('/hash/:sessionId', setUser, isAdmin, getHash)

export default router
