// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { duo } from "../../helpers/dualAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<String>,
) {
  const response = await duo();

  res.status(200).send(response);
}
