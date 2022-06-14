const config = { ...require("../config") };
const nodemailer = require("nodemailer");
// const { google } = require("googleapis")
const jwt = require("jsonwebtoken");
async function mailSending(sentTo, mailInfo, htmlMSG) {
	try {
		const option = {
			service: config.gmail_host,
			auth: {
				user: config.admin_sender_email,
				pass: config.gmail_password
			}
		}
		const transporter = nodemailer.createTransport(option);
		const mailOptions = {
			from: `Speaking Course <${config.admin_sender_email}>`,
			to: sentTo,
			subject: mailInfo.subject,
			html: htmlMSG,
		};
		await transporter.sendMail(mailOptions);
		// console.log(transporter)
		return true;
	} catch (error) {
		return false;
	}

}


module.exports = { mailSending };