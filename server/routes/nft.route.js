import express from 'express'
import { createNft, deleteNfts, getNfts } from '../controllers/nft.controller.js'

const router = express.Router()

router.post('/', createNft)
router.get('/', getNfts)
router.post('/delete', deleteNfts)

export default router