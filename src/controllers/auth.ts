import { Request, Response } from "express";
import { User } from "../entities/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "../config/database";
import { errorResponse, successResponse } from "../utils/responseHandler";

const userRepo = connectDB.getRepository(User);

export const signup = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;

    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) {
      return errorResponse(res, 400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepo.create({ email, password: hashedPassword });
    await userRepo.save(newUser);

    return successResponse(res, 201, "User registered successfully");
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      return errorResponse(res, 400, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 400, "Invalid email or password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return successResponse(res, 200, "Login successful", { token });
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
