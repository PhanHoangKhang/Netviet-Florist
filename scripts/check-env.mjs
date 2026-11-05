const envGroups = {
  app: [
    "MONGODB_URI",
    "RESEND_API_KEY",
    "ADMIN_EMAIL",
    "AWS_REGION",
    "AWS_S3_BUCKET",
    "CLOUDFRONT_DOMAIN",
  ],

  seed: [
    "MONGODB_URI",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",
  ],

  awsCredentials: [
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
  ],
};

const group = process.argv[2] || "app";

const requiredEnvVars = envGroups[group];

if (!requiredEnvVars) {
  console.error(`Unknown environment group: ${group}`);
  console.error("Available groups: app, seed, awsCredentials");
  process.exit(1);
}

const missing = requiredEnvVars.filter(
  (key) => !process.env[key]?.trim()
);

if (missing.length > 0) {
  console.error("\nMissing environment variables:");

  missing.forEach((key) => {
    console.error(`- ${key}`);
  });

  process.exit(1);
}

console.log(`Environment check passed: ${group}`);