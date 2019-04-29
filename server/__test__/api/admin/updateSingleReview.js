const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");
const app = require("../../../app");

const Review = require("../../../database/models/Review");

describe("Tesing for updating review route", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test for aprroval of review status", async (done) => {
    const data = {
      email: "admin@earwig.com",
      password: "123456",
    };

    const reviewToBeUpdated = await Review.findOne({ isVerified: false });

    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        request(app)
          .patch("/api/admin/reviews/update-status")
          .set("Cookie", [token])
          .send({ id: reviewToBeUpdated._id, bool: true })
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            expect(res.body.isVerified).toBeTruthy();
            done(err);
          });
      });
  });

  test("test for rejection of review status", async (done) => {
    const data = {
      email: "admin@earwig.com",
      password: "123456",
    };

    const reviewToBeUpdated = await Review.findOne({ isVerified: true });

    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        request(app)
          .patch("/api/admin/reviews/update-status")
          .set("Cookie", [token])
          .send({ id: reviewToBeUpdated._id, bool: false })
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            expect(res.body.isVerified).toBeFalsy();
            done(err);
          });
      });
  });
});
