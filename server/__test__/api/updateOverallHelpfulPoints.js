const request = require("supertest");
const mongoose = require("mongoose");

const Review = require("./../../database/models/Review");
const User = require("./../../database/models/User");
const Helpfulness = require("./../../database/models/Helpfulness");

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

        const helpfulnessBefore = await Helpfulness.find({ helpfulUser: reviewBefore.user });

        const pointsBefore = helpfulnessBefore.reduce((prev, curr) => prev + curr.points, 0);

        expect(helpfulnessBefore).toHaveLength(4);

        const points = 1;

        request(app)
          .patch(`/api/review/${reviewBefore._id}/overallReview/helpful-points`)
          .send({
            points,
            userId: reviewBefore.user,
            organization: reviewBefore.organization,
          })

          .expect("Content-Type", /json/)
          .set("Cookie", [token])
          .expect(200)
          .end(async (err, res) => {
            const helpfulnessAfter = await Helpfulness.find({ helpfulUser: reviewBefore.user });
            expect(helpfulnessAfter).toHaveLength(5);

            expect(res).toBeDefined();
            expect(res.body).toBeDefined();

            const userAfter = await User.findById(reviewBefore.user);
            expect(userAfter.points).toBe(points + pointsBefore);
            done(err);
          });
      });
  });
});
