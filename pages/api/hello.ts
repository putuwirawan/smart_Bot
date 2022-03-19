// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import withProtect from '../../middleware/withProtect'
import { IUser } from '../../types/user.type';


type NextApiRequestWithFormData = NextApiRequest &
	Request & {
		user: IUser;
	};

type NextApiResponseCustom = NextApiResponse & Response;

type DataResfonse = {
  success: boolean,
  message?:string,
  data?:any
}

const handler = (
	req: NextApiRequestWithFormData,
	res: NextApiResponse<DataResfonse>
) => {

return	res.status(200).send({ success: true, data: req.user });
};
export default withProtect(handler);