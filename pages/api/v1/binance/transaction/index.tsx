import type { NextApiRequest, NextApiResponse } from "next";
import withProtect from "../../../../../middleware/withProtect";
import * as errors from "../../../../../helpers/error";
import dbConnect from "../../../../../db/config/DbConnect";
import { Transaction } from "../../../../../db/models";
import { IExchange } from "../../../../../types/Exchange.type";
import { IUser } from "../../../../../types/user.type";
import connectBinance from "../../../../../middleware/connectBinance";

type NextApiRequestWithFormData = NextApiRequest &
	Request & {
		user: IUser;
		apikey: string;
		exchange: IExchange;
	};

type NextApiResponseCustom = NextApiResponse & Response;

type DataResfonse = {
	success: boolean;
	message?: string;
	data?: any;
	code?: string;
};
dbConnect();
const handler = async (
	req: NextApiRequestWithFormData,
	res: NextApiResponse<DataResfonse>
) => {
	const user = req.user;
	const method = req.method;
	const exchange = req.exchange;
	const body = req.body;
	if (exchange) {
		switch (method) {
			case "GET": {
				const transactions = await Transaction.find({
					userId: user._id,
					exchangeId: exchange._id,
				})
					.populate("exchangeId")
					.populate({ path: "settingId", populate: { path: "pairId" } })
					.exec();

				return res.status(200).send({ success: true, data: transactions });
			}
			case "POST": {
				const newTransaction = {
					userId: user._id,
					exchangeId: exchange._id,
					settingId: body.settingId,
					totQty: body.totQty,
					totAmount: body.totAmount,
					transactionOrder: body.transactionOrder,
				};
				try {
					const trx = await new Transaction(newTransaction).save();
					return res.status(200).send({ success: true, data: trx });
				} catch (error: any) {
					return errors.errorHandler(res, error.message, null);
				}
			}

			default:
				return errors.errorHandler(res, "method not allowed", null);
		}
	} else {
		return errors.errorHandler(res, "no available data Exchange", null);
	}
};
export default withProtect(connectBinance(handler));
