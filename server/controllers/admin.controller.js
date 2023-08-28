import Admin from '../models/admin.model.js';
import { createError } from '../utils/createError.js';
import bcrypt from 'bcrypt';
import { sendEmail } from '../utils/mailer.js';
import jwt from 'jsonwebtoken';

export const createAdmin = async (req, res, next) => {
	try {
		const email = await Admin.findOne({ email: req.body.email });
		if (email)
			return next(
				createError(400, 'Admin with the same email already exist')
			);
		const hash = bcrypt.hashSync(req.body.password, 5);
		const newAdmin = new Admin({
			...req.body,
			password: hash,
		});
		await newAdmin.save();

		const title = 'Admin information';
		const text = `email: ${newAdmin.email}
                    password: ${req.body.password}`;

		sendEmail(newAdmin.email, title, text);

		res.status(201).send('Admin successfully created');
	} catch (e) {
		next(e);
	}
};

export const login = async (req, res, next) => {
	try {
		const admin = await Admin.findOne({ email: req.body.email });
		if (!admin) return next(createError(404, 'Admin not found'));

		const isCorrect = bcrypt.compareSync(req.body.password, admin.password);
		if (!isCorrect) return next(createError(400, 'Wrong password or email'));

		const token = jwt.sign(
			{
				id: admin._id,
				isSuper: admin.isSuper,
				email: admin.email,
			},
			process.env.JWT_KEY
		);

		const { password, ...info } = admin._doc;
		res.cookie('accessToken', token, { httpOnly: true })
			.status(200)
			.send(info);
	} catch (e) {
		next(e);
	}
};

export const logout = async (req, res, next) => {
	try {
		res.clearCookie('accessToken', {
			sameSite: 'none',
			secure: true,
		})
			.status(200)
			.send('Admin has been logged out');
	} catch (error) {
		next(error);
	}
};

export const changePassword = async (req, res, next) => {
	try {
		const admin = await Admin.findOne({ email: req.email });
		if (!admin) return next(createError(404, 'Admin not found'));

		const isCorrect = bcrypt.compareSync(
			req.body.current_password,
			admin.password
		);
		if (!isCorrect) return next(createError(400, 'Wrong password'));
		if (req.body.new_password !== req.body.confirm_password)
			return next(createError(400, 'Passwords do not match'));

		admin.password = bcrypt.hashSync(req.body.new_password, 5);
		await admin.save();

		res.status(200).send('Password successfully changed');
	} catch (error) {
		next(error);
	}
};

export const getContacts = async (req, res, next) => {
	try {
		const contacts = await Admin.find({ _id: { $ne: req.userId } }).select(['name', 'surname'])
		if(!contacts.length) return next(createError(404, 'Contacts not found'))
		res.status(200).send(contacts)
	} catch (err) {
		next(err);
	}
};
