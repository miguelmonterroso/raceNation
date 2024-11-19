import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadFile = async (fileBuffer, fileName, fileType) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET, 
    Key: fileName, 
    Body: fileBuffer, 
    ContentType: fileType, 
  };

  await s3Client.send(new PutObjectCommand(params));

  return { Location: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}` };
};
