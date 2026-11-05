
const requiredEnvVars = [
  "MONGODB_USERNAME",
  "MONGODB_PASSWORD",
  "MONGODB_URI",

  "RESEND_API_KEY",

  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",

  "AWS_REGION",
  "AWS_S3_BUCKET",
  "CLOUDFRONT_DOMAIN",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
];

const missing = requiredEnvVars.filter((key) => {
  return !process.env[key]?.trim();
});

if (missing.length > 0) {
  console.error("\n Missing environment variables:");

  missing.forEach((key) => {
    console.error(`- ${key}`);
  });

  process.exit(1);
}

console.log(" All required environment variables are configured.");
