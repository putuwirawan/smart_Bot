import { NextApiRequest, NextApiResponse } from "next";
import { Request } from "express";
import * as errors from "../helpers/error";
import { IUser } from "../types/user.type";
import { Exchange } from "../db/models";
import { IExchange } from "../types/Exchange.type";

type NextApiRequestWithFormData = NextApiRequest &
	Request & {
		user: IUser;
		apikey: string;
		exchange: IExchange;
	};

const connectToko = (handler: any) => {
	return async (req: NextApiRequestWithFormData, res: NextApiResponse) => {
		// Roles in an array
		const user = req.user;
		const exchanges = user.exchangeConnect;
		const myexchange = await Exchange.findOne({ code: "tokocrypto" });

		if (exchanges && exchanges.length > 0 ) {
			let exchangeName = "";
			let exchangeKey = "";
			for (const exchange of exchanges) {
				if (exchange.name == "tokocrypto") {
					exchangeName = exchange.name;
					exchangeKey = exchange.key;
				}
			}

			if (exchangeName == "" || exchangeKey == "") {
				return errors.errorHandler(
					res,
					"Not connect to Toko Crypto Exchange",
					null
				);
			} else {
				req.apikey = exchangeKey;
				req.exchange = myexchange;
				return handler(req, res);
			}
		} else {
			return errors.errorHandler(
				res,
				"Not connect to Toko Crypto Exchange",
				null
			);
		}
	};
};

export default connectToko;
