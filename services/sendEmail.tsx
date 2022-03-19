import { NextApiResponse } from "next";

const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "wirawanputu98@gmail.com",
		pass: "Wiendny_98",
	},
});

async function sendEmail(
	res: NextApiResponse,
	reciever: string,
	token: string
) {
	let mailOpts = {
		from: "wirawanputu98@gmail.com",
		to: reciever,
		subject: "Confirn Register",
		html:
			"<h2> Smart Trading Bot </h2> <br> " +
			`<h> Hi ${reciever} Thank for join in "Smart Trading Bot"</h> <br>` +
			"<h> Click link below to activate your account</h> <br>" +
			`<p><a href="${process.env.HOST}/verify/${token}">Confirm Register </a></p>`,
	};
	mailTransporter.sendMail(mailOpts, function (error: any, info: any) {
      
		if (error) {
			return error.errorHandler(res, error, null);
		} else {
			return res
				.status(200)
				.send({ success: true, message: "Email sent successfully, check your email to confirm" });
		}
	});
}

export default sendEmail;
