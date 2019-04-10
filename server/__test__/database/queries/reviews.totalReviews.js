const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const { totalReviews } = require("./../../../database/queries/reviews");

// const Organization = require("../../../database/models/Organization");
const Review = require("../../../database/models/Review");

describe("Test totalReviews query", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test with correct organization ID", async (done) => {
    const review = await Review.findOne();
    const organizationID = review.organization;

    totalReviews(organizationID).then((result) => {
      expect(result).toBeDefined();
      expect(result.length).toBe(2);
      done();
    });
  });
});
