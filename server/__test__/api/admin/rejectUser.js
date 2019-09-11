const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");
const app = require("../../../app");

const User = require("./../../../database/models/User");

describe("Tesing for reject user", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("Tesing for reject user route", async (done) => {
    const data = {
      email: "admin@earwig.com",
      password: "123456",
    };

    const awaitingReviewUser = await User.findOne({ email: "level2-awaiting@earwig.com" });

    // login with the origin password
    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        request(app)
          .patch("/api/admin/users/reject")
          .send({ id: awaitingReviewUser._id })
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            done(err);
          });
      });
  });
});
