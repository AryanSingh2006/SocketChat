import user from "../models/user.model.js";
import jwtUtil from "../utils/jwt.utils.js";
import { NODE_ENV } from "../config/constants.js";
import cloudinary from "../config/cloudinary.js"

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    //Check if email already exists
    const existingEmail = await user.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //Create user in MongoDB
    const createdUser = await user.create({
      fullName,
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
      name: createdUser.fullName,
      email: createdUser.email
    });

    // Set cookie with token
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000
    });

    // Send success response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: createdUser._id,
        fullName: createdUser.fullName,
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
        fullName: existedUser.fullName
      });

      // Store the token in an HTTP-only cookie for security
      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000 // Token valid for 1 day
      });

      // Send success response with user details
      return res.status(200).json({
        message: "Login successful",
        user: {
          _id: existedUser._id,
          email: existedUser.email,
          fullName: existedUser.fullName
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
      sameSite: "None",
      secure: true
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

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const fullUser = await user.findById(req.user._id).select("-password");
    res.status(200).json(fullUser);
  } catch (error) {
    console.log("Error in checking Auth: ", error.message);
    res.status(500).json({
      message: "Internal Server error"
    })
  }
}