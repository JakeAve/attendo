import { Router } from 'express'
import { attendByAttendeeId } from '../controllers/attendee'

const router = Router()

router.post('/:attendeeId', attendByAttendeeId)

export default router
