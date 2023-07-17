import express from 'express'
import { getInfo } from '../controllers/dashboard.controller.js'

const router = express.Router()

router.get('/', getInfo)

export default router