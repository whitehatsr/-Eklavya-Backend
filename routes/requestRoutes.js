import express from 'express'
const router = express.Router()
import {
  protect
} from '../middlewares/authMiddleware.js'

import { createRequest , setRequestStatus} from './../controllers/requestController.js'

router.route('/request/mentor/:mentorId').post(protect, createRequest)
router.route('/request/:requestId/setStatus').post(protect, setRequestStatus)

export default router