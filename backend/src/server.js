import { PORT } from "./config/constants.js";
import connectDB from "./config/DB.config.js";
import app from "./app.js";
import { initializeSocket } from "./config/socket.js";

const startServer = async () => {
  try {
    await connectDB();
    const server = initializeSocket(app);
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