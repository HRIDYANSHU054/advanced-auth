import jwt from "jsonwebtoken";

import { throwCustomError } from "../utils/throwCustomError.js";

export async function verifyToken(req, resp, next) {
  //this is the name we gave to this cookie while setting it up in
  //req.cookie("token", token, {options})
  const { token } = req.cookies;
  if (!token)
    return throwCustomError(
      "Unauthorised - no token provided",
      401,
      true,
      next
    );

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) throwCustomError("Unauthorized - invalid token", 401);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("error in api/auth/verifyToken", error.message);
    next(error);
  }
}
