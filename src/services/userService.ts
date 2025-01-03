import user from "../models/user";
import { generateSalt, hashPassword } from "../utils/passwordUtil";
import { generateToken } from "../utils/jwt";

export class UserService {
  // Register user
  async registerUser(email: string, password: string) {
    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Generate salt and hash password
    const salt = generateSalt();
    const passwordHash = hashPassword(password, salt);

    // Create a new user
    const newUser = new user({
      email,
      passwordHash,
      passwordSalt: salt,
      role: "patron", // We are only allowing patrons to register not the librarian
    });

    await newUser.save();

    // Generate token
    const token = generateToken({
      email: newUser.email,
      role: newUser.role,
    });

    // Return user excluding password fields and token
    return {
      user: {
        email: newUser.email,
        role: newUser.role,
      },
      token,
    };
  }

  // Login user
  async loginUser(email: string, password: string) {
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      throw new Error("User does not exist");
    }

    const passwordHash = hashPassword(password, existingUser.passwordSalt);
    if (passwordHash !== existingUser.passwordHash) {
      throw new Error("Invalid Password");
    }

    // Generate token
    const token = generateToken({
      email: existingUser.email,
      role: existingUser.role,
    });

    // Return user excluding password fields and token
    return {
      user: {
        email: existingUser.email,
        role: existingUser.role,
      },
      token,
    };
  }
}
