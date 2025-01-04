import bcrypt from "bcryptjs";

import { User } from "../models/User.model.js";
import { throwCustomError } from "../utils/throwCustomError.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { generateResetPasswordToken } from "../utils/generateResetPasswordToken.js";
import {
  sendResetPasswordEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";

export async function signUp(req, resp, next) {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    const error = new Error("Validation error.");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      throwCustomError("User already exists", 409);
    }

    const verificationToken = generateVerificationToken();
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      name,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    // jwt
    generateTokenAndSetCookie(resp, user._id);

    //verification mail YAY
    await sendVerificationEmail(user.email, user.verificationToken);

    return resp.status(201).json({
      message: "User created successfully",
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    console.log("error in api/auth/signUp", error.message);
    next(error);
  }
}

export async function verifyEmail(req, resp, next) {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      throwCustomError("User not found", 404);
    }

    user.isVerified = true;
    //verification token is no longer
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    await sendWelcomeEmail(user.name, user.email);

    return resp.status(200).json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    console.log("error in api/auth/verifyEmail", error.message);
    next(error);
  }
}

export async function login(req, resp, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throwCustomError("User not found", 404);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throwCustomError("Invalid credentials", 401);
    }

    generateTokenAndSetCookie(resp, user._id);

    user.lastLogin = Date.now();
    await user.save();

    return resp.status(200).json({
      message: "Logged in Successfully",
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin,
        },
      },
    });
  } catch (error) {
    console.log("error in api/auth/login", error.message);
    next(error);
  }
}

export async function logout(req, resp) {
  resp.clearCookie("token");
  resp.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}

export async function forgotPassword(req, resp, next) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throwCustomError("User not found", 404);
    }

    const resetToken = generateResetPasswordToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 60 * 60 * 1000; //after 1 hour

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendResetPasswordEmail(user.email, resetUrl);

    return resp.status(200).json({
      message: "Reset password mail sent successfully",
      success: true,
    });
  } catch (error) {
    console.log("error in api/auth/forgotPassword", error.message);
    next(error);
  }
}

export async function resetPassword(req, resp, next) {
  const { token } = req.params;
  const { password } = req.body;
  console.log("token", token);
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      throwCustomError("Invalid or expired reset token", 404);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    await sendResetSuccessEmail(user.email);

    return resp.status(200).json({
      message: "Password Reset Successful",
      success: true,
    });
  } catch (error) {
    console.log("error in api/auth/resetPassword", error.message);
    next(error);
  }
}

export async function checkAuth(req, resp, next) {
  const { userId } = req;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) throwCustomError("User not found", 400);

    resp.status(200).json({
      message: "User is authenticated",
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
          lastLogin: user?.lastLogin || undefined,
        },
      },
    });
  } catch (error) {
    console.log("error in api/auth/checkAuth", error.message);
    next(error);
  }
}
