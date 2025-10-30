import user from "../models/user.model.js";
import jwtUtil from "../utils/jwt.utils.js";
import { NODE_ENV } from "../config/constants.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //Check if email already exists
    const existingEmail = await user.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //Check if username already exists
    const existingUsername = await user.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    //Create user in MongoDB
    const createdUser = await user.create({
      username,
      email,
      password
    });

    if (!createdUser) {
      return res.render('registerPage', {
        error: "Failed to create user",
        alert: null
      });
    }

    // Generate JWT
    const accessToken = jwtUtil.generateAccessToken({
      _id: createdUser._id,
      name: createdUser.username,
      email: createdUser.email
    });

    // Set cookie with token
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    // Send success response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Registration failed"
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists by email
    const existedUser = await user.findOne({ email });

    if (!existedUser) {
      return res.status(400).json({ message: "No Email address found" });
    }

    // Compare the provided password with the hashed password stored in DB
    const isMatch = await existedUser.comparePassword(password);

    if (isMatch) {
      // Generate a JSON Web Token for authentication
      const accessToken = jwtUtil.generateAccessToken({
        _id: existedUser._id,
        email: existedUser.email,
        username: existedUser.username
      });

      // Store the token in an HTTP-only cookie for security
      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000 // Token valid for 1 day
      });

      // Send success response with user details
      return res.status(200).json({
        message: "Login successful",
        user: {
          _id: existedUser._id,
          email: existedUser.email,
          username: existedUser.username
        }
      });
    } else {
      // Return error if password does not match
      return res.status(400).json({
        message: "Email Id or Password is wrong"
      });
    }

  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).json({
      error: "Login failed"
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
      secure: NODE_ENV
    });
    res.status(200).json({
      message: "Logout successfully"
    })
  } catch (error) {
    res.status(400).json({
      message: error || "Logout Failed"
    })
  }
};