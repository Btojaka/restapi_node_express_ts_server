import request from "supertest";
import server from "../../server";

// POST /api/products tests

describe("POST /api/products", () => {
  it("should display validation errors", async () => {
    const res = await request(server).post("/api/products").send({});
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(4);

    expect(res.status).not.toEqual(401);
    expect(res.body.errors).not.toHaveLength(2);
  });

  it("should validate that the price is grater than 0", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Monitor - testing",
      price: 0,
    });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);

    expect(res.status).not.toEqual(401);
    expect(res.body.errors).not.toHaveLength(2);
  });

  it("should validate that the price is number and grater than 0", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Monitor - testing",
      price: "hello",
    });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(2);

    expect(res.status).not.toEqual(404);
    expect(res.body.errors).not.toHaveLength(3);
  });

  it("should create a new product", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Mouse - testing",
      price: 50,
    });
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("data");

    expect(res.status).not.toEqual(404);
    expect(res.status).not.toEqual(200);
    expect(res.body).not.toHaveProperty("error");
  });
});

// GET /api/products tests

describe("GET /api/products", () => {
  it("should check if api/products is working", async () => {
    const res = await request(server).get("/api/products");
    expect(res.status).not.toEqual(404);
    expect(res.status).not.toEqual(400);
  });
  it("should return all products", async () => {
    const res = await request(server).get("/api/products");
    expect(res.status).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(res.body).toHaveProperty("data");
    expect(res.body).not.toHaveProperty("errors");
  });
});

// GET /api/products/:id tests

describe("GET /api/products/:id", () => {
  it("should return 404 if product is not found", async () => {
    const productId = 100;
    const res = await request(server).get(`/api/products/${productId}`);
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Product not found");
  });

  it("should return 400 if product id is not valid", async () => {
    const productId = "hello";
    const res = await request(server).get(`/api/products/${productId}`);
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe("Incorrect value");
    expect(res.body.errors[1].msg).toBe("Id must be greater than 0");
  });

  it("get a JSON for a single product", async () => {
    const productId = 1;
    const res = await request(server).get(`/api/products/${productId}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

// PUT /api/products/:id tests

describe("PUT /api/products/:id", () => {
  it("should return 400 if product id is not valid", async () => {
    const productId = "hello";
    const res = await request(server).put(`/api/products/${productId}`).send({
      name: "Mouse - testing uploaded put",
      price: 65,
      availability: false,
    });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe("Incorrect value");
    expect(res.body.errors[1].msg).toBe("Id must be greater than 0");
  });
  // validation messages
  it("should display validation errors when send some/all empty atributtes", async () => {
    const productId = 1;
    const res = await request(server)
      .put(`/api/products/${productId}`)
      .send({});
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toBeTruthy();
    expect(res.body.errors).toHaveLength(5);

    expect(res.status).not.toEqual(200);
    expect(res.body.errors).not.toHaveLength(3);
    expect(res.body.errors).not.toHaveProperty("data");
  });
  it("should return 404 if product is not found", async () => {
    const productId = 100;
    const res = await request(server).put(`/api/products/${productId}`).send({
      name: "Mouse - testing uploaded put",
      price: 65,
      availability: false,
    });
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Product not found");

    expect(res.status).not.toEqual(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("should return 200 if product exists and has been updated", async () => {
    const productId = 1;
    const res = await request(server).put(`/api/products/${productId}`).send({
      name: "Monitor - testing uploaded put",
      price: 250,
      availability: true,
    });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");

    expect(res.status).not.toEqual(400);
    expect(res.body).not.toHaveProperty("error");
  });
});

// PATCH /api/products/:id tests (update availability to opposite)
describe("PATCH /api/products/:id", () => {
  it("should return 400 if product id is not valid", async () => {
    const productId = "hello";
    const res = await request(server).patch(`/api/products/${productId}`).send({
      availability: false,
    });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe("Incorrect value");
    expect(res.body.errors[1].msg).toBe("Id must be greater than 0");
  });
  it("should return 404 if product is not found", async () => {
    const productId = 100;
    const res = await request(server).patch(`/api/products/${productId}`);
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Product not found");
  });
  it("should return 200 if product exists and has been updated", async () => {
    const productId = 1;
    const res = await request(server).patch(`/api/products/${productId}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.availability).toBe(false);

    expect(res.status).not.toEqual(400);
    expect(res.body).not.toHaveProperty("error");
  });
});

// DELETE /api/products/:id tests

describe("DELETE /api/products/:id", () => {
  it("should return 404 if product is not found", async () => {
    const productId = 100;
    const res = await request(server).delete(`/api/products/${productId}`);
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Product not found");
  });
  it("should return 400 if product id is not valid", async () => {
    const productId = "hello";
    const res = await request(server).delete(`/api/products/${productId}`);
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe("Incorrect value");
    expect(res.body.errors[1].msg).toBe("Id must be greater than 0");
  });
  it("should return 200 if product exists and has been deleted", async () => {
    const productId = 1;
    const res = await request(server).delete(`/api/products/${productId}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBe("Deleted product");

    expect(res.status).not.toEqual(404);
    expect(res.body).not.toHaveProperty("error");
  });
});
