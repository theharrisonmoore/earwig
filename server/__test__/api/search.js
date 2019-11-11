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
    await buildDB();
  });

  test("test valid request", (done) => {
    request(app)
      .get("/api/search/agency")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body[0].searchData[0]._id).toBeDefined();
        done();
      });
  });
});
