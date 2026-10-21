
import { S3Client } from "@aws-sdk/client-s3";

const region = process.env.AWS_REGION;
const bucket = process.env.AWS_S3_BUCKET;
const cloudFrontDomain = process.env.CLOUDFRONT_DOMAIN;

if (!region || !bucket || !cloudFrontDomain) {
  throw new Error("Missing AWS S3 or CloudFront configuration.");
}

export const s3 = new S3Client({
  region,
  // AWS SDK tự đọc AWS_ACCESS_KEY_ID và AWS_SECRET_ACCESS_KEY
});

export const S3_BUCKET = bucket;

export const CLOUDFRONT_DOMAIN = cloudFrontDomain.replace(/\/+$/, "");

export function getCloudFrontUrl(key: string) {
  return `${CLOUDFRONT_DOMAIN}/${key
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
}
