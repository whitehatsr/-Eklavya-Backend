import express from 'express'
const router = express.Router()
import {
  protect
} from '../middlewares/authMiddleware.js'

import { getMyMentees } from './../controllers/menteeController.js'

router.route('/myMentees').get(protect, getMyMentees)

export default router