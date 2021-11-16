import express from 'express'
const router = express.Router()
import {
  protect
} from '../middlewares/authMiddleware.js'

import { getMentors, getMyMentors } from './../controllers/mentorController.js'
import { getAllRequestsOnMentor } from './../controllers/mentorController.js'

router.route('/mentors').get(protect, getMentors)
router.route('/mentor/requests').get(protect, getAllRequestsOnMentor)
router.route('/myMentors').get(protect, getMyMentors)

export default router