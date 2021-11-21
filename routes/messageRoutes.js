import express from 'express'
const router = express.Router()
import {
  protect
} from '../middlewares/authMiddleware.js'

import { getMessages, sendMessage } from './../controllers/messageController.js'

router.route('/messages/:userId').get(protect, getMessages)
router.route('/message/:userId').post(protect, sendMessage)

export default router