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
import { validateRefreshToken } from '../middleware/validateRefreshToken'

const router = Router()

router.get(
  '/attendance/:sessionId',
  validateRefreshToken,
  setUser,
  getAttendance,
)
router.post('/:courseId', validateRefreshToken, setUser, isAdmin, createSession)
router.put('/:sessionId', validateRefreshToken, setUser, updateSession)
router.get('/by-hash/:hash', getSessionByHash)
router.get('/hash/:sessionId', validateRefreshToken, setUser, isAdmin, getHash)

export default router
