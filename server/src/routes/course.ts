import { Router } from 'express'
import { createCourse } from '../controllers/course'

const router = Router()

router.post('/', createCourse)

export default router
