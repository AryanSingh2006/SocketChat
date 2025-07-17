const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true
  });

  return res.redirect("/login");
};

export default logoutUser;