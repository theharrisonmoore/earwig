const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const Review = require("../../../database/models/Review");
const Organization = require("../../../database/models/Organization");

const { getReviewDetails } = require("../../../database/queries/reviews");

describe("Test get review details query", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test with correct review ID", async (done) => {
    const review = await Review.findOne();
    getReviewDetails(review._id).then((result) => {
      expect(result).toBeDefined();
      expect(result.length).toBeDefined();
      expect(result[0].answer).toBeDefined();
      done();
    });
  });

  test("Test with incorrect review ID", async (done) => {
    const review = "notValid";
    getReviewDetails(review._id).then((result) => {
      expect(result).toBeDefined();
      expect(result.length).toBe(0);
      expect(result[0]).toBeUndefined();
      done();
    });
  });
});
