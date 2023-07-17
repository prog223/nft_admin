import express from 'express'
import { createCollection, deleteCollections, getCollections } from '../controllers/collection.controller.js'

const router = express.Router()

router.post('/', createCollection)
router.post('/delete', deleteCollections)
router.get('/', getCollections)


export default router