import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";

export default async function handler(hash: string) {
  const filename = `${hash}.png`;

  const s3Client = new S3Client({
    region: process.env.S3_REGION || "",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || "",
      secretAccessKey: process.env.S3_SECRET_KEY || "",
    },
  });

  const getCommand = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: process.env.S3_JSON_FILE,
  });

  const { Body } = await s3Client.send(getCommand);
  const bodyContents = await streamToString(Body as Readable);
  const urlJSON = JSON.parse(bodyContents);
  urlJSON.data.unshift(filename);

  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: process.env.S3_JSON_FILE,
    Body: JSON.stringify(urlJSON),
  });

  return await s3Client.send(uploadCommand);
}

async function streamToString(stream: Readable): Promise<string> {
  return await new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
}
