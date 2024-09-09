import { createServer } from "http";
import app from "./app";
import { config } from "./config/env";
import { connectDB } from "./config/database"; 

const { LOCAL_PORT, PORT } = config;
const port = PORT || LOCAL_PORT;

connectDB.initialize()
  .then(() => {
    console.log("Database connected successfully");

    const server = createServer(app);
    server.listen(port, () => {
      console.log(`Server running on *::${port}`);
    });
  })
  .catch((error) => {
    console.error("Error during database initialization:", error);
    process.exit(1); 
  });
