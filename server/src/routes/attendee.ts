import { Router } from 'express'
import {
  attendAsNewAttendee,
  attendByAttendeeId,
  getAttendance,
  updateAttendeeName,
} from '../controllers/attendee'

const router = Router()

router.get('/attendance/:attendeeId', getAttendance)
router.post('/attend/:attendeeId', attendByAttendeeId)
router.post('/attend-new', attendAsNewAttendee)
router.post('/update-name/:attendeeId', updateAttendeeName)

export default router
