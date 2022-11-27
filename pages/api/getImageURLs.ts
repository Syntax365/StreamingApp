// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import s3 from "../../helpers/s3_Get_Admin_Data";

type Data = { data: any };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  getImageUrlData(res);
}

const getImageUrlData = async (res: NextApiResponse<Data>) => {
  const response = await s3();
  res.status(200).json(response);
};
