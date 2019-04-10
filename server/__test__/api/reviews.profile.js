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

  test("test with correct organization id", async (done) => {
    const review = await Review.findOne();
    const data = { organizationID: review.organization };

    request(app)
      .post("/api/profile")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.reviewDetails).toBeDefined();
        expect(res.body.summary).toBeDefined();
        expect(res.body.reviewDetails.length).toBeGreaterThan(1);
        done();
      });
  });
});
