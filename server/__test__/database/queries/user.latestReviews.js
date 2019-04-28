const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");

const { latestReviews } = require("./../../../database/queries/user");

const Review = require("../../../database/models/Review");

describe("Test for latestReviews query", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  beforeEach(async () => {
    await buildDB();
  });

  test("Test with logged in user", async (done) => {
    const review = await Review.findOne();
    const userId = review.user;

    latestReviews(userId).then((result) => {
      expect(result).toBeDefined();
      expect(result[0].createdAt).toBeDefined();
      expect(result[0].organization.length).toBeGreaterThan(0);
      done();
    });
  });
});
