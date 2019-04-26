const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");
const app = require("../../../app");

const Review = require("../../../database/models/Review");

const Answer = require("../../../database/models/Answer");

const { getReviewDetails } = require("../../../database/queries/reviews");

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

    const review = await Review.findOne();
    const reviewAnswers = await getReviewDetails(review._id);
    const singleAnswer = reviewAnswers[0].answers[0]._id;

    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        request(app)
          .post("/api/admin/reviews/delete-answer")
          .set("Cookie", [token])
          .send({ data: { id: singleAnswer._id } })
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            expect(res.body).toBe("success");
            const deletedAnswer = await Answer.findOne({ id: singleAnswer._id });
            expect(deletedAnswer).toBeNull();
            done(err);
          });
      });
  });
});
