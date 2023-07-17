
import express from 'express';
import {
	deleteUsers,
	getUsers,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/delete', deleteUsers);

export default router;
