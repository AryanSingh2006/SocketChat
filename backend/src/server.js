import { PORT } from "./config/constants.js";
import connectDB from "./config/DB.config.js";
import {server} from "./config/socket.js";



const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is live on http://localhost:${PORT}`)
    })
  }
  catch (err) {
    console.error("An error occuried: ", err)
    process.exit(1);
  }
}

startServer();