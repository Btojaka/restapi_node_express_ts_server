import express from "express";
import router from "./router";
import db from "./config/db";

//Conect db

async function connectDB() {
  try {
    await db.authenticate();
    db.sync(); // va a ir agregando las tablas que no existan si todo esta bien
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Error is: ", error);
    console.error("Unable to connect to the database");
  }
}

connectDB();

const server = express();

server.use("/api/products", router);

export default server;
