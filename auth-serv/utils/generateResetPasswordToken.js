import crypto from "crypto";

export function generateResetPasswordToken() {
  const resetPasswordToken = crypto.randomBytes(20).toString("hex");
  return resetPasswordToken;
}
