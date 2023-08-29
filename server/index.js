import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import verifyToken from './middleware/jwt.js';
import { Server } from 'socket.io';

import adminRoute from './routes/admin.route.js';
import nftRoute from './routes/nft.route.js';
import userRoute from './routes/user.route.js';
import collectionRoute from './routes/collection.route.js';
import dashboardRoute from './routes/dashboard.route.js';
import requestRoute from './routes/request.route.js';
import contentRoute from './routes/content.route.js';
import messageRoute from './routes/message.route.js';

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

try {
	await mongoose.connect(process.env.MONGODB_URL);
	console.log('connected to mongoDB');
} catch (error) {
	console.log(error);
}

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/admin', adminRoute);
app.use('/api/nft', verifyToken, nftRoute);
app.use('/api/user', verifyToken, userRoute);
app.use('/api/collection', verifyToken, collectionRoute);
app.use('/api/dashboard', verifyToken, dashboardRoute);
app.use('/api/request', verifyToken, requestRoute);
app.use('/api/content', verifyToken, contentRoute);
app.use('/api/message', verifyToken, messageRoute);

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || 'Something went wrong';
	return res.status(errorStatus).send(errorMessage);
});

const server = app.listen(8000, () => {
	console.log('server is running on port 8000');
});

const io = new Server(server, {
	cors: {
		origin: process.env.CLIENT_URL,
	},
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
	global.chatSocket = socket;
	socket.on('add-user', (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on('send-msg', (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit('msg-recieve', data);
			socket.to(sendUserSocket).emit('notification', {
				isRead: false,
				sender: data.from,
			});
		}
	});
});
