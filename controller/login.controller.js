import userModel from "../models/user.model.js";
import { NODE_ENV } from "../config/constants.js";
import jwtUtil from "../utils/jwt.utils.js";

const renderLoginPage = (req, res) => {
  res.render("loginPage", {
    emaiError: null,
    passwordError: null
  }
  );
}

const loginData = async (req, res) => {
  const { email, password } = req.body;

  const existedUser = await userModel.findOne({
    email: email
  })

  if (!existedUser) {
    res.render("loginPage", {
      emaiError: "Email id doesnt exist",
      passwordError: null
    });
  }
  else {
    const isMatch = await existedUser.comparePassword(password);

    if (isMatch) {
      //SETTING UP THE JSONWEBTOKENS
      const accessToken = jwtUtil.generateAccessToken({ _id: existedUser._id, email: existedUser.email });
      const refreshToken = jwtUtil.generateRefreshToken({ _id: existedUser._id, email: existedUser.email });

      existedUser.refreshToken = refreshToken;
      await existedUser.save();

      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.redirect("/api/messages/chat");
    }
    else {
      res.render("loginPage", {
        passwordError: "Your Password is wrong",
        emailError: null
      })
    }
  }
}
export default {
  renderLoginPage,
  loginData
}