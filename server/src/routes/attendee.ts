import { Router } from 'express'
import {
  attendAsNewAttendee,
  attendByAttendeeId,
} from '../controllers/attendee'

const router = Router()

router.post('/:attendeeId', attendByAttendeeId)
router.post('/new/:attendeeId', attendAsNewAttendee)

export default router
