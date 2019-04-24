const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");
const app = require("../../../app");

const Review = require("../../../database/models/Review");

describe("Tesing for delete review route", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test for delete review", async (done) => {
    const data = {
      email: "admin@earwig.com",
      password: "123456",
    };

    const reviewToBeDelted = await Review.findOne();

    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        request(app)
          .delete("/api/admin/reviews")
          .set("Cookie", [token])
          .send({ id: reviewToBeDelted._id })
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();

            const deletedReview = await Review.findOne({ id: reviewToBeDelted._id });
            expect(deletedReview).toBeNull();
            done(err);
          });
      });
  });
});
