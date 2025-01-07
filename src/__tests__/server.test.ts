import request from "supertest";
import server from "../server";

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
