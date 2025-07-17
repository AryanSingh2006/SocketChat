import user from "../models/user.model.js"
import { NODE_ENV } from "../config/constants.js"
import jwtUtil from "../utils/jwt.utils.js"

//function to render the Register page
const renderRegisterPage = (req, res) => {
  res.render('registerPage', {
    alert: null,
    error: null
  })
}
//fuunction get the data from the form on the register page
const registerData = async (req, res) => {
  const { username, email, password } = req.body;

  //checking if user already exist
  const existingEmail = await user.findOne({
    email: email
  })
  const existingUsername = await user.findOne({
    username: username
  })
  if (existingEmail) {
    return res.render('registerPage', {
      alert: "Email already exist",
      error: null
    })
  }
  if (existingUsername) {
    return res.render('registerPage', {
      alert: "Username already exist",
      error: null
    })
  }

  //Creating the user in the Mongodb
  const createdUser = await user.create({
    username: username,
    email: email,
    password: password
  })

  //checking if the user is created or not
  if (!createdUser) {
    return res.render('registerPage', {
      error: "Failed to create user",
      alert: null
    });
  }
  else {
    //SETTING UP THE JSONWEBTOKEN
    const accessToken = jwtUtil.generateAccessToken({ id: createdUser._id, email: createdUser.email });
    const refreshToken = jwtUtil.generateRefreshToken({ id: createdUser._id, email: createdUser.email });

    createdUser.refreshToken = refreshToken;
    await createdUser.save();

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

    res.redirect('homePage')
  }
}

export default {
  renderRegisterPage,
  registerData
};