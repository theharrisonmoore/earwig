const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/dummyData/index");
const app = require("./../../app");

// const Review = require("./../../database/models/Review");
// const User = require("./../../database/queries/User");

describe("Testing getUserReviews route", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await buildDB();
  });

  test("test with logged in user", async (done) => {
    const user = {
      email: "ref1@earwig.com",
      password: "123456",
    };

    // login with the origin password
    request(app)
      .post("/api/login")
      .send(user)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        request(app)
          .get("/api/user-reviews")
          .set("Cookie", [token])
          .expect(200)
          .end((err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            expect(res.body[0].createdAt).toBeDefined();
            expect(res.body[0].organization.length).toBeGreaterThan(0);
            done(err);
          });
      });
  });
});
