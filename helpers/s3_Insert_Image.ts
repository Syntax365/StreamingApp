import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export default async function handler(hash: string, imageBase64: string) {
  const filePath = `${hash}.png`;

  const s3Client = new S3Client({
    region: process.env.S3_REGION || "",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || "",
      secretAccessKey: process.env.S3_SECRET_KEY || "",
    },
  });

  const buffer = Buffer.from(imageBase64, "base64");

  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filePath,
    Body: buffer,
  });

  return await s3Client.send(uploadCommand);
}
