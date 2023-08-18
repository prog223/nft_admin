import express from 'express'
import { createNft, deleteNfts, getNft, getNfts } from '../controllers/nft.controller.js'

const router = express.Router()

router.post('/', createNft)
router.get('/', getNfts)
router.get('/:id', getNft)
router.post('/delete', deleteNfts)

export default router