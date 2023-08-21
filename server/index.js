import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import verifyToken from './middleware/jwt.js';

import adminRoute from './routes/admin.route.js';
import nftRoute from './routes/nft.route.js';
import userRoute from './routes/user.route.js';
import collectionRoute from './routes/collection.route.js';
import dashboardRoute from './routes/dashboard.route.js';
import requestRoute from './routes/request.route.js';
import contentRoute from './routes/content.route.js'

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
		origin: 'http://localhost:3001',
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
app.use('/api/content', verifyToken, contentRoute)

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || 'Something went wrong';
	return res.status(errorStatus).send(errorMessage);
});

app.listen(8000, () => {
	console.log('server is running on port 8000');
});
