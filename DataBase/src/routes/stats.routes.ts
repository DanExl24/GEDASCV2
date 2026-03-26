import { Router } from 'express'
import { StatsRecord,TodayActivity } from '../controllers/stats.controller'
const router = Router()

router.get('/historial',StatsRecord)
router.get('/actividadHoy',TodayActivity)
export default router
