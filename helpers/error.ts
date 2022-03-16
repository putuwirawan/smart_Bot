
import type { NextApiRequest, NextApiResponse } from "next";

export const errorHandler = (
	res: NextApiResponse,
	errorMessage: string,
	errorCode: string | null
) => {
	if (errorCode === "invalidToken" || errorCode === "refreshExpired") {
		return res.status(403).send({
			success: false,
			message: errorMessage,
			code: errorCode,
		});
	} else {
		return res.status(400).send({
			success: false,
			message: errorMessage,
		});
	}
};
