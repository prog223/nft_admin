import express from 'express'
import { deleteRequest, getRequests, confirm } from '../controllers/request.controller.js'

const router = express.Router()

router.get('/', getRequests)
router.post('/delete', deleteRequest)
router.post('/confirm/:id', confirm)

export default router