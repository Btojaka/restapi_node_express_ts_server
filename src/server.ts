import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import path from "path";
import router from "./router";
import db from "./config/db";

//Conect db

export async function connectDB() {
  try {
    await db.authenticate();
    db.sync(); // Sync all models that are not already in the database AUTOMATICALLY when the server starts
    // console.log(
    //   colors.bgGreen("Connection has been established successfully.")
    // );
  } catch (error) {
    // console.log("Error is: ", error);
    console.log(colors.bgRed.italic("Unable to connect to the database"));
  }
}
// Call the function to connect to the database
connectDB();

// instantiate the server
const server = express();

// allow connections
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (origin === process.env.FRONTEND_URL) {
      console.log("Connecion Allowed...");
      callback(null, true);
    } else {
      console.log("Connecion rejected");
      callback(new Error("CORS error"), false);
    }
  },
};

server.use(cors(corsOptions));

// read json data in the body of the request without this line of code, the server will not be able to read the body of the request
server.use(express.json());

server.use(morgan("dev"));

server.use("/api/products", router);

// Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

// Serve static files from the "assets" directory
server.use("/assets", express.static(path.resolve(__dirname, "..", "assets")));

export default server;
