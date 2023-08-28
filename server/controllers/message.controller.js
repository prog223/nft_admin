import Messages from '../models/message.model.js';

export const getMessages = async (req, res, next) => {
	try {
		const { from, to, page } = req.body;

		const totalMessages = await Messages.countDocuments({
			admins: {
				$all: [from, to],
			},
		});

		const messagesPerPage = 15;
		const totalPages = Math.floor(totalMessages / messagesPerPage);
		const currentPage = Math.min(page, totalPages);
		const s = totalMessages % messagesPerPage;

		let messages;
		if (currentPage === 1 && s) {
			messages = await Messages.find({
				admins: {
					$all: [from, to],
				},
			})
				.sort({ updatedAt: 1 })
				.skip((totalPages - 1) * messagesPerPage + s);
		} else {
			messages = await Messages.find({
				admins: {
					$all: [from, to],
				},
			})
				.sort({ updatedAt: 1 })
				.skip((totalPages - currentPage) * 10);
		}

		const projectedMessages = messages.map((msg) => {
			return {
				fromSelf: msg.sender.toString() === from,
				message: msg.message,
			};
		});

		const response = {
			messages: projectedMessages,
			currentPage,
			totalPages,
		};

		res.send(response);
	} catch (err) {
		next(err);
	}
};

export const addMessage = async (req, res, next) => {
	try {
		const { from, to, message } = req.body;
		const data = await Messages.create({
			message: message,
			admins: [from, to],
			sender: from,
		});

		res.send({ msg: 'Message added successfully.' });
	} catch (err) {
		next(err);
	}
};
