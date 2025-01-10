import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

describe("GET /api", () => {
  it("It should send back a json response", async () => {
    const res = await request(server).get("/api");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Welcome to the API");
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );

    // not to be expected

    expect(res.status).not.toBe(404);
    expect(res.body.message).not.toBe("to the API");
    // console.log(res.text);
    // console.log(res.body.message);
  });
});

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
