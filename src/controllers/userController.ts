import express, { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export const registerUser = async (
  req: Request & { body: { email: string; password: string } },
  res: Response
) => {
  try {
    const { email, password } = req.body;

    // Check if email and password is present
    if (!email || !password) {
      res.status(400).json({ message: "Email and Password is Required" });
      return;
    }

    // Call service to register user
    const result = await userService.registerUser(email, password);
    res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const loginUser = async (
  req: Request & { body: { email: string; password: string } },
  res: Response
) => {
  try {
    const { email, password } = req.body;

    // Check if email and password is present
    if (!email || !password) {
      res.status(400).json({ message: "Email and Password is Required" });
      return;
    }

    // Call service to log the user
    const result = await userService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
