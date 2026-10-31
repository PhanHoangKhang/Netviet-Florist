import crypto from "node:crypto";

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateVerifier(length = 43) {
  return Array.from(
    crypto.randomBytes(length),
    (byte) => chars[byte % chars.length]
  ).join("");
}

const codeVerifier = generateVerifier();

const codeChallenge = crypto
  .createHash("sha256")
  .update(codeVerifier, "ascii")
  .digest("base64url");

const state = crypto.randomBytes(32).toString("hex");

console.log("ZALO_CODE_VERIFIER =", codeVerifier);
console.log("ZALO_CODE_CHALLENGE =", codeChallenge);
console.log("ZALO_OAUTH_STATE =", state);