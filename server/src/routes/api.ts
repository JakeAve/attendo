import { Router } from 'express'

const router = Router()

import courseRoutes from './course'
router.use('/course', courseRoutes)

import participantRoutes from './participant'
router.use('/participant', participantRoutes)

export default router
