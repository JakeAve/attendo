import { Router } from 'express'
import {
  attendAsNewAttendee,
  attendByAttendeeId,
  getAttendance,
  updateAttendeeName,
} from '../controllers/attendee'
import { setUser } from '../middleware/setUser'

const router = Router()

router.get('/attendance/:attendeeId', setUser, getAttendance)
router.post('/attend/:attendeeId', attendByAttendeeId)
router.post('/attend-new', attendAsNewAttendee)
router.post('/update-name/:attendeeId', setUser, updateAttendeeName)

export default router
