import { Router } from 'express'
import { login, logout, refreshToken, register } from '../controllers/auth'
import { validateRefreshToken } from '../middleware/validateRefreshToken'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)
router.post('/refresh', validateRefreshToken, refreshToken)

export default router
