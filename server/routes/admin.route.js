import express from 'express';
import {
	changePassword,
	createAdmin,
	login,
	logout,
} from '../controllers/admin.controller.js';
import verifyToken from '../middleware/jwt.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/change_password', verifyToken, changePassword);
router.post('/', createAdmin);

export default router;
