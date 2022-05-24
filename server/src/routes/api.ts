import { Router } from 'express'

const router = Router()

import attendeeRoutes from './attendee'
router.use('/attendee', attendeeRoutes)

import authRoutes from './auth'
router.use('/auth', authRoutes)

import courseRoutes from './course'
router.use('/courses', courseRoutes)

import sessionRoutes from './session'
router.use('/sessions', sessionRoutes)

export default router
