import { Router } from 'express'
import { attendByAttendeeId } from '../controllers/attendee'

const router = Router()

router.post('/:attendeeId/:sessionId', attendByAttendeeId)

export default router
