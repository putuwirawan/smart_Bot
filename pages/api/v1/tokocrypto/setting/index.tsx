import type { NextApiRequest, NextApiResponse } from "next";
import withProtect from "../../../../../middleware/withProtect";
import * as errors from "../../../../../helpers/error";
import dbConnect from "../../../../../db/config/DbConnect";
import { Exchange, Setting, Transaction } from "../../../../../db/models";
import { NewSetting } from "../../../../../services/newSetting";
import connectToko from "../../../../../middleware/connectToko";
import { IExchange } from "../../../../../types/Exchange.type";
import { IUser } from "../../../../../types/user.type";

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

	if (exchange) {
		switch (method) {
			// to create new setting require pairId on body
			case "POST":
				{
					const pairId = req.body.pairId;
					if (!pairId) {
						return errors.errorHandler(res, "Select valid Pair", null);
					}
					const exisSetting = await Setting.findOne({
						userId: user._id,
						exchangeId: exchange._id,
						pairId: pairId,
					});
					if (exisSetting) {
						return res.status(200).send({ success: true, data: exisSetting });
					} else {
						let newSetting = NewSetting(pairId, user._id, exchange._id);
						newSetting.firstBuy = "12";
						const createSetting = new Setting(newSetting);
						createSetting.save((err: any, result: any) => {
							if (result) {
								return res.status(200).send({ success: true, data: result });
							}
							if (err) {
								return errors.errorHandler(res, err.message, null);
							}
						});
					}
				}
				break;
			case "GET": {
				let xx = [];
				const transactions = await Transaction.find({
					userId: user._id,
					exchangeId: exchange._id,
				});
				if (transactions && transactions.length > 0) {
					for (const trx of transactions) {
						xx.push(trx.settingId);
					}
				}
				const exisSetting = await Setting.find({
					_id: { $nin: xx },
					userId: user._id,
					exchangeId: exchange._id,
				}).populate("pairId");

				return res.status(200).send({ success: true, data: exisSetting });
			}

			default:
				return errors.errorHandler(res, "method not allowed", null);
		}
	} else {
		return errors.errorHandler(res, "no available data Exchange", null);
	}
};
export default withProtect(connectToko(handler));
