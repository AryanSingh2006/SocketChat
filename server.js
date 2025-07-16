import app from "./app.js";
import {PORT} from "./config/constants.js";
import connectDB from "./config/DB.config.js";

const startServer = async () => {
  try{
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is live on http://localhost:${PORT}`)
    })
  }
  catch(err){
    console.error("An error occuried: ", err)
    process.exit(1);
  }
}

startServer();