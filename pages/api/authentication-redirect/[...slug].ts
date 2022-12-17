// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { duoRedirect } from "../../../helpers/dualAuth";

type Data = {
  message: string;
  status: number | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data = (await duoRedirect(req, res)) || {
    message: "Failed to authenticate",
    status: 500,
  };
}
