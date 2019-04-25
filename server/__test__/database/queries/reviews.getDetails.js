const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const Review = require("../../../database/models/Review");

const { getReviewDetails, approveReview } = require("../../../database/queries/reviews");

describe("Test get review details query", () => {
  beforeAll(async () => {
    await buildDB();
  });

  beforeEach(async () => {
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

  test("Test approve review query", async (done) => {
    const review = await Review.findOne({ isVerified: false });

    await approveReview(review._id, true).then((result) => {
      expect(result).toBeDefined();
      expect(result.isVerified).toBeTruthy();
    });
    done();
  });

  test("Test approve review query", async (done) => {
    const review = await Review.findOne({ isVerified: false });

    await approveReview(review._id, true).then((result) => {
      expect(result).toBeDefined();
      expect(result.isVerified).toBeTruthy();
    });
    done();
  });

  test("Test reject review query", async (done) => {
    const review = await Review.findOne({ isVerified: true });

    await approveReview(review._id, false).then((result) => {
      expect(result).toBeDefined();
      expect(result.isVerified).toBeFalsy();
    });
    done();
  });
});
