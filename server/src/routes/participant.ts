import { Router } from 'express'
import { createParticipant } from '../controllers/participant'

const router = Router()

router.post('/', createParticipant)

export default router
