import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
  try {
    await db.sync({ force: true }); // force: true will drop the table if it already exists
    console.log("Database cleared");
    exit();
  } catch (error) {
    console.error("Error clearing the database");
    exit(1); // exit with error
  }
};

if (process.argv[2] === "--clear") {
  clearDB();
}

console.log(process.argv);
