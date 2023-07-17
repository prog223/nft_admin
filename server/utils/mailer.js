import mail from 'nodemailer';

export const sendEmail = (to, title, text, from = process.env.contactEmail) => {
	let transporter = mail.createTransport({
		host: process.env.contactHost,
		port: 465,
		maxMessages: Infinity,
		debug: true,
		secure: true,
		auth: {
			user: process.env.contactEmail,
			pass: process.env.contactPassword,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	transporter.sendMail(
		{
			from: `${from} <${from}>`,
			to: to,
			subject: title,
			replyTo: from,
			headers: {
				'Mime-Version': '1.0',
				'X-Priority': '3',
				'Content-type': 'text/html; charset=iso-8859-1',
			},
			html: text,
		},
		(err, info) => {
			console.log(info);
			if (err !== null) {
				console.log(err);
			} else {
				console.log(`Email sent to ${to} at ${new Date().toISOString()}`);
			}
		}
	);
};
