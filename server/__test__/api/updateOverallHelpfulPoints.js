const request = require("supertest");
const mongoose = require("mongoose");

const Review = require("./../../database/models/Review");
const User = require("./../../database/models/User");

const buildDB = require("./../../database/dummyData/index");
const app = require("./../../app");

describe("Tesing for update helpfulness points", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("Tesing for update helpfulness points", (done) => {
    const data = {
      email: "admin@earwig.com",
      password: "123456",
    };

    // login
    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];
        const reviewBefore = await Review.findOne();
        const userBefore = await User.findById(reviewBefore.user);

        expect(userBefore.points).toBe(0);
        expect(reviewBefore.overallReview.votes).toHaveLength(1);


        const points = 5;
        request(app)
          .patch(`/api/review/${reviewBefore._id}/overall/helpful-points`)
          .send({
            points,
            prevPoints: 0,
            userId: reviewBefore.user,
          })
          .expect("Content-Type", /json/)
          .set("Cookie", [token])
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            expect(res.body.updatedPoints).toBe(points);

            const userAfter = await User.findById(reviewBefore.user);
            const reviewAfter = await Review.findOne();
            expect(reviewAfter.overallReview.votes).toHaveLength(2);
            expect(userAfter.points).toBe(points);
            done(err);
          });
      });
  });
});
