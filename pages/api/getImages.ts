// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import s3_insert_image from "../../helpers/s3_Insert_Image";
import s3_update_adminfile from "../../helpers/s3_update_adminfile";

type Data = {
  imageURL: string;
};

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const fs = require("fs");
const openai = new OpenAIApi(configuration);
const prompt =
  "hallucinogenic french bulldog mad scientist mixing sparking chemicals, digital art";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  generateImage(res);
}

const generateImage = async (res: NextApiResponse<Data>) => {
  // const imageData = await openai.createImage({
  //   prompt: prompt,
  //   n: 1,
  //   size: "256x256",
  //   response_format: "b64_json",
  // });

  // const imageBase64 = imageData.data.data[0].b64_json as any;
  // const hash = await getImageHash(imageBase64);

  //await s3_insert_image(hash, imageBase64);
  //await s3_update_adminfile(hash);

  const response = {
    // imageURL: `${process.env.S3_BUCKET_BASE_URL}${hash}.png`,
    imageURL: "",
  };

  res.status(200).json(response);
};

function getImageHash(b_64: string) {
  const crypto = require("crypto");
  return crypto.createHash("md5").update(b_64).digest("hex");
}
