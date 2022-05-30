import { Router } from 'express'
import {
  attendAsNewAttendee,
  attendByAttendeeId,
  getAttendance,
} from '../controllers/attendee'

const router = Router()

router.get('/attendance/:attendeeId', getAttendance)
router.post('/attend/:attendeeId', attendByAttendeeId)
router.post('/attend-new/:attendeeId', attendAsNewAttendee)

export default router
