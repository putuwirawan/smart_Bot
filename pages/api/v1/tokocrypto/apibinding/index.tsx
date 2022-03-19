// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import withProtect from "../../../../../middleware/withProtect";
import * as errors from "../../../../../helpers/error";
import dbConnect from "../../../../../db/config/DbConnect";
import { Exchange, User } from "../../../../../db/models";
import { TkoAcountBalance } from "../../../../../services/TokoCrypto.service";
import { IUser } from "../../../../../types/user.type";
const jwt = require("jsonwebtoken");

type NextApiRequestWithFormData = NextApiRequest &
	Request & {
		user: IUser;
	};

type NextApiResponseCustom = NextApiResponse & Response;

type DataResfonse = {
	success: boolean;
	message?: string;
	data?: any;
};
dbConnect();
const handler = async (
	req: NextApiRequestWithFormData,
	res: NextApiResponse<DataResfonse>
) => {
	const user = req.user;
	const method = req.method;
	const body = req.body;
	const exchange = await Exchange.findOne({ code: "tokocrypto" });
	// to connecting your api require apiKey and secretKey on body
	if (method == "POST") {
		if (exchange) {
			const apiKey = body.apiKey;
			const secretKey = body.secretKey;
			const api = {
				apiKey: apiKey,
				secretKey: secretKey,
			};
			const balance = await TkoAcountBalance({ baseAsset: "ADA", api: api });
			if (balance) {
				const key = jwt.sign(body, process.env.JWT_SECRET);
				try {
					let connectExchange = user.exchangeConnect;
					if (connectExchange && connectExchange.length > 0) {
						let xkey = "";
						let index = -1;
						connectExchange.map((item, i) => {
							if (item.name == "tokocrypto") {
								xkey = key;
								index = i;
							}
						});

						if (xkey !== "") {
						await	User.findOne({ _id: user._id }).then((item) => {
								item.exchangeConnect[index].key = key;
								item.save();
							});
							return res.status(200).send({ success: true, data: key });
						} else {
							User.findByIdAndUpdate(user._id, {
								$push: { exchangeConnect: { name: "tokocrypto", key: key } },
							}).exec((err: any, result: IUser) => {
								if (result) {
									return res.status(200).send({ success: true, data: key });
								}
								if (err) {
									return errors.errorHandler(res, err.message, null);
								}
							});
						}
					} else {
						User.findByIdAndUpdate(user._id, {
							$push: { exchangeConnect: { name: "tokocrypto", key: key } },
						}).exec((err: any, result: IUser) => {
							if (result) {
								return res.status(200).send({ success: true, data: key });
							}
							if (err) {
								return errors.errorHandler(res, err.message, null);
							}
						});
					}
				} catch (error: any) {
					return errors.errorHandler(res, error.message, null);
				}
			} else {
				return errors.errorHandler(res, "invalid apiKey and secretKey", null);
			}
		} else {
			return errors.errorHandler(res, "Exchange not Available", null);
		}
	} else {
		return errors.errorHandler(res, "req_method_not_supported", null);
	}
};
export default withProtect(handler);
