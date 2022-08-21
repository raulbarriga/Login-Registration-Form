import { S3Client } from "@aws-sdk/client-s3";

const bucketName = process.env.BUCKET_PROJECT_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

export const connectToS3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey,
  },
  region: bucketRegion,
});

// const connectToS3Bucket = s3;

// export default generateToken;
