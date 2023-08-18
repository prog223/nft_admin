import express from 'express'
import { createCollection, deleteCollections, getCollection, getCollections } from '../controllers/collection.controller.js'

const router = express.Router()

router.post('/', createCollection)
router.post('/delete', deleteCollections)
router.get('/', getCollections)
router.get('/:id', getCollection)

export default router