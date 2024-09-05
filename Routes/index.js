import { Router } from "express";
import AuthRoutes from './authRoutes.js'
import EventRoutes from './eventRoutes.js'

const router = Router()

router.use('/auth', AuthRoutes)
router.use('/event', EventRoutes)

export default router