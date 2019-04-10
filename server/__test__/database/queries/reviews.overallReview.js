const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const { overallReview } = require("../../../database/queries/reviews");

// const Organization = require("../../../database/models/Organization");
const Review = require("../../../database/models/Review");

describe("Test overallReview query", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test with correct organization ID", async (done) => {
    const review = await Review.findOne();
    const organizationID = review.organization;

    overallReview(organizationID).then((result) => {
      expect(result).toBeDefined();
      expect(result.length).toBe(1);
      expect(result[0].reviews.length).toBe(2);
      expect(result[0]._id).toEqual(organizationID);
      expect(result[0].reviews[0].organization).toEqual(organizationID);
      done();
    });
  });
});
