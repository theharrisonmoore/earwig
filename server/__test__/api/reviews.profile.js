const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/dummyData/index");
const app = require("./../../app");

const Review = require("./../../database/models/Review");

describe("Testing profile route", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await buildDB();
  });

  test("test with correct organization id and level 2 user", async (done) => {
    const review = await Review.findOne();
    const organizationID = review.organization;

    const user = {
      email: "level3@earwig.com",
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
          .get(`/api/profile/${organizationID}`)
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            expect(res.body.reviewDetails).toBeDefined();
            expect(res.body.summary).toBeDefined();
            expect(res.body.reviewDetails.length).toBeGreaterThan(1);
            done(err);
          });
      });
  });

  test("test with correct organization id and logged out user", async (done) => {
    const review = await Review.findOne();
    const organizationID = review.organization;

    request(app)
      .get(`/api/profile/${organizationID}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.reviewDetails).toBeDefined();
        expect(res.body.summary).toBeDefined();
        expect(res.body.reviewDetails.length).toEqual(0);
        done(err);
      });
  });
});
