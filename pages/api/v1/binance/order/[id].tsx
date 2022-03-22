import type { NextApiRequest, NextApiResponse } from "next";
import withProtect from "../../../../../middleware/withProtect";
import * as errors from "../../../../../helpers/error";
import dbConnect from "../../../../../db/config/DbConnect";
import { Order, Requestorder } from "../../../../../db/models";
import connectToko from "../../../../../middleware/connectToko";
import { IExchange } from "../../../../../types/Exchange.type";
import { IUser } from "../../../../../types/user.type";
import { IOrder } from "../../../../../types/Order.type";
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
};
dbConnect();
const handler = async (
	req: NextApiRequestWithFormData,
	res: NextApiResponse<DataResfonse>
) => {
	const user = req.user;
	const method = req.method;
	const exchange = req.exchange;
	const { id } = req.query;

	if (exchange) {
		switch (method) {
			case "GET": {
				try {
					const orders = await Order.findById(id)
						.populate("pairId")
						.populate("exchangeId")
						.exec();
					return res.status(200).send({ success: true, data: orders });
				} catch (error: any) {
					return errors.errorHandler(res, error.message, null);
				}
			}
			case "DELETE": {
				try {
					const order: IOrder = await Order.findById(id).exec();
					let _newRequest: IOrder = order;
					_newRequest.side = 3;
					_newRequest.baseId = order._id;
					_newRequest._id = "";
					const newRequest = await new Requestorder(_newRequest).save();

					return res.status(200).send({ success: true, data: newRequest });
				} catch (error: any) {
					return errors.errorHandler(res, error.message, null);
				}
			}

			default:
				return errors.errorHandler(res, "req_method_not_supported", null);
		}
	} else {
		return errors.errorHandler(res, "Exchange not Available", null);
	}
};
export default withProtect(connectToko(handler));
