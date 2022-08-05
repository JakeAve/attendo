import { Router } from 'express'
import {
  attendAsNewAttendee,
  attendByAttendeeId,
  getAttendance,
  updateAttendeeName,
} from '../controllers/attendee'
import { setUser } from '../middleware/setUser'
import { validateRefreshToken } from '../middleware/validateRefreshToken'

const router = Router()

router.get(
  '/attendance/:attendeeId',
  validateRefreshToken,
  setUser,
  getAttendance,
)
router.post('/attend/:attendeeId', attendByAttendeeId)
router.post('/attend-new', attendAsNewAttendee)
router.post(
  '/update-name/:attendeeId',
  validateRefreshToken,
  setUser,
  updateAttendeeName,
)

export default router
