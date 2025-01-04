import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mtClient, mtSender } from "./mailtrap.config.js";

export async function sendVerificationEmail(email, verificationToken) {
  const recipent = [{ email }];

  try {
    await mtClient.send({
      from: mtSender,
      to: recipent,
      subject: "Account Verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Account Verification",
    });

    console.log("Verification email sent to", email);
  } catch (error) {
    console.log("Error in sendVerificationEmail", error.message);
    throw new Error("Error sending verification email: " + error.message);
  }
}

export async function sendWelcomeEmail(name, email) {
  const recipent = [{ email }];
  try {
    await mtClient.send({
      from: mtSender,
      to: recipent,
      template_uuid: process.env.WELCOME_EMAIL_TEMPLATE_UUID,
      template_variables: {
        company_info_name: "HAuth Inc",
        name,
      },
    });

    console.log("Welcome email sent to", email);
  } catch (error) {
    console.log("Error in sendWelcomeEmail", error.message);
    throw new Error("Error sending welcome email: " + error.message);
  }
}

export async function sendResetPasswordEmail(email, resetUrl) {
  const recipent = [{ email }];

  try {
    await mtClient.send({
      from: mtSender,
      to: recipent,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Reset Password",
    });

    console.log("Reset Password email sent to", email);
  } catch (error) {
    console.log("Error in sendResetPasswordEmail", error.message);
    throw new Error("Error sending reset password email: " + error.message);
  }
}

export async function sendResetSuccessEmail(email) {
  const recipent = [{ email }];
  try {
    await mtClient.send({
      from: mtSender,
      to: recipent,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Reset Password Successful",
    });

    console.log("Password Reset Successful email sent to", email);
  } catch (error) {
    console.log("Error in sendResetSuccessEmail", error.message);
    throw new Error(
      "Error sending password reset successful email: " + error.message
    );
  }
}
