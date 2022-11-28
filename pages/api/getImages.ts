// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import s3_insert_image from "../../helpers/s3_Insert_Image";
import s3_update_adminfile from "../../helpers/s3_update_adminfile";

type Data = {
  imageURL: string | undefined;
  error: boolean | undefined;
};

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (
    process.env.ENABLE_IMAGE_GENERATION === "true" &&
    typeof req.body.imageString === "string"
  ) {
    generateImage(req.body.imageString, res);
  } else {
    res.status(200).json({
      error: true,
      imageURL: undefined,
    });
  }

  res.status(400);
}

const generateImage = async (
  imageString: string,
  res: NextApiResponse<Data>,
) => {
  const imageData = await openai.createImage({
    prompt: imageString,
    n: 1,
    size: "256x256",
    response_format: "b64_json",
  });

  const imageBase64 = imageData.data.data[0].b64_json as any;
  const hash = await getImageHash(imageBase64);

  await s3_insert_image(hash, imageBase64);
  await s3_update_adminfile(hash);

  const response = {
    error: true,
    imageURL: `${process.env.S3_BUCKET_BASE_URL}${hash}.png`,
  };

  res.status(200).json(response);
};

function getImageHash(b_64: string) {
  const crypto = require("crypto");
  return crypto.createHash("md5").update(b_64).digest("hex");
}
