import express from 'express';
import {
	createContent,
	getContent,
	updateContent,
} from '../controllers/content.controller.js';

const router = express.Router();

router.post('/', createContent);
router.post('/update', updateContent);
router.get('/', getContent);

export default router;
