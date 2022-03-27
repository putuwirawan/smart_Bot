import type { NextApiRequest, NextApiResponse } from "next";
import withProtect from "../../../../../middleware/withProtect";
import * as errors from "../../../../../helpers/error";
import dbConnect from "../../../../../db/config/DbConnect";
import { Setting } from "../../../../../db/models";
import connectToko from "../../../../../middleware/connectToko";
import { resetSetting } from "../../../../../services/globalVariable";
import { brotliDecompressSync } from "zlib";

type NextApiRequestWithFormData = NextApiRequest &
	Request & {
		user: any;
		apikey: string;
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
	const method = req.method;
	const { id } = req.query;
	const body = req.body;

	switch (method) {
		case "POST": {
			try {
				const update = resetSetting;
				const exisSetting = await Setting.findByIdAndUpdate(id, update)
					.populate("pairId")
					.exec();
				return res.status(200).send({ success: true, data: exisSetting });
			} catch (error: any) {
				return errors.errorHandler(res, error.message, null);
			}
		}
		case "GET": {
			try {
				const exisSetting = await Setting.findById(id)
					.populate("pairId")
					.exec();
				return res.status(200).send({ success: true, data: exisSetting });
			} catch (error: any) {
				return errors.errorHandler(res, error.message, null);
			}
		}

		case "PUT": {
			try {
				const exisSetting = await Setting.findByIdAndUpdate(id, body).exec();
			
				return res.status(200).send({ success: true, data: exisSetting });
			} catch (error: any) {
				return errors.errorHandler(res, error.message, null);
			}
		}
		case "DELETE": {
			try {
				const exisSetting = await Setting.findByIdAndDelete(id).exec();
				return res.status(200).send({ success: true, data: exisSetting });
			} catch (error: any) {
				return errors.errorHandler(res, error.message, null);
			}
		}

		default:
			return errors.errorHandler(res, "method not allowed", null);
	}
};
export default withProtect(connectToko(handler));
