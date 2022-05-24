import { Router } from 'express'
import { createSession } from '../controllers/session'

const router = Router()

router.post('/:courseId', createSession)

export default router
