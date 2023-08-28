import express from 'express'
import { addMessage, getMessages } from '../controllers/message.controller.js'

const router = express.Router()

router.post('/addMessage', addMessage)
router.post('/getMessages', getMessages)

export default router