import { NextApiRequest, NextApiResponse } from "next";
import { Request } from "express";
import * as errors from "../helpers/error";
import { IUser } from "../types/user.type";

type NextApiRequestWithFormData = NextApiRequest &
	Request & {
		user: IUser;
		apikey: string;
	};

const connectBinance = (handler: any) => {
	return async (req: NextApiRequestWithFormData, res: NextApiResponse) => {
		// Roles in an array
		const user = req.user;
		const exchanges = user.exchangeConnect;

		if (exchanges && exchanges.length > 0) {
			let exchangeName = "";
			let exchangeKey = "";
			for (const exchange of exchanges) {
				if (exchange.name == "binance") {
					exchangeName = exchange.name;
					exchangeKey = exchange.key;
				}
			}

			if (exchangeName == "" || exchangeKey == "") {
				return errors.errorHandler(
					res,
					"Not connect to Binance Exchange",
					null
				);
			} else {
				req.apikey = exchangeKey;
				return handler(req, res);
			}
		} else {
			return errors.errorHandler(res, "Not connect to Binance Exchange", null);
		}
	};
};

export default connectBinance;
