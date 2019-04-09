const request = require("supertest");
const mongoose = require("mongoose");
const buildDB = require("./../../database/dummyData/index");
const app = require("./../../app");

describe("testing search route", () => {
  beforeAll(async () => {
    await buildDB();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  beforeEach(async () => {
    buildDB();
  });

  test("test with valid request", (done) => {
    const data = {
      searchTerm: "A A C Mechanical & Electrical",
    };
    request(app)
      .get("/api/search")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (err, res) => {
        expect(res).toBeDefined();
        expect(res.body[0]).toBeDefined();
        expect(res.body[0]._id).toBeDefined();
        expect(res.body[0].category).toBe("company");
        done();
      });
  });
});
