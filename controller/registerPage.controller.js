import user from "../models/user.model.js"

//function to render the Register page
const renderRegisterPage = (req,res) => {
  res.render('registerPage', {
    alert : null,
    error : null
  })
}
//fuunction get the data from the form on the register page
const registerData = async (req,res) => {
  const { username, email, password} = req.body;

  //checking if user already exist
  const existingEmail = await user.findOne({
    email : email
  })
  const existingUsername = await user.findOne({
    username : username
  })
  if(existingEmail){
    return res.render('registerPage',{
      alert : "Email already exist",
      error : null
    })
  }
  if(existingUsername){
    return res.render('registerPage',{
      alert : "Username already exist",
      error : null
    })
  }

  //Creating the user in the Mongodb
  const createdUser = await user.create({
    username : username,
    email : email,
    password : password
  })

  //checking if the user is created or not
  if (!createdUser) {
    return res.render('registerPage', {
    error: "Failed to create user",
    alert:null
  });
  }
  else {
    res.redirect('homePage')
  }
}

export default {
  renderRegisterPage,
  registerData
};