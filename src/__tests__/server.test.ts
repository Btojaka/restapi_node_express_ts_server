import { connectDB } from "../server";
import db from "../config/db";

jest.mock("../config/db");

// Mock the db connection

describe("Test the database connection", () => {
  it("should handle database error connection", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Unable to connect to the database")); // Mock force the authenticate method to throw an error
    const consoleSpy = jest.spyOn(console, "log"); // Mock the console.log method

    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Unable to connect to the database")
    );
  });
});
