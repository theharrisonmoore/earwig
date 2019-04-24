const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");
const app = require("../../../app");

const Review = require("../../../database/models/Review");

describe("Tesing for get single review route", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test for get single review route", async (done) => {
    const data = {
      email: "admin@earwig.com",
      password: "123456",
    };

    const review = await Review.findOne();

    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        request(app)
          .get(`/api/admin/single-review/${review._id}`)
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            expect(res.body[0]).toBeDefined();
            expect(res.body[0]._id).toBeDefined();
            expect(typeof res.body[0].answer).toBe("string");
            done(err);
          });
      });
  });
});
