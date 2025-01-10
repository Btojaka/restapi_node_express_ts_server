import express from "express";
import colors from "colors";
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

// read json data in the body of the request without this line of code, the server will not be able to read the body of the request
server.use(express.json());

server.use("/api/products", router);

// test the server
server.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

export default server;
