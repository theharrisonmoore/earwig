// tests for the single review page in the admin panel
const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const Review = require("../../../database/models/Review");

const {
  getReviewDetails,
  approveRejectReview,
  deleteAnswer,
} = require("../../../database/queries/reviews");

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
    await getReviewDetails(review._id).then((result) => {
      expect(result).toBeDefined();
      expect(result.length).toBeDefined();

      done();
    });
  });

  test("Test with incorrect review ID", async (done) => {
    const review = "notValid";
    await getReviewDetails(review._id).then((result) => {
      expect(result).toBeDefined();
      expect(result.length).toBe(0);
      expect(result[0]).toBeUndefined();
      done();
    });
  });

  test("Test approve review query", async (done) => {
    const review = await Review.findOne({ isVerified: false });

    await approveRejectReview(review._id, true).then((result) => {
      expect(result).toBeDefined();
      expect(result.isVerified).toBeTruthy();
    });
    done();
  });

  test("Test approve review query", async (done) => {
    const review = await Review.findOne({ isVerified: false });

    await approveRejectReview(review._id, true).then((result) => {
      expect(result).toBeDefined();
      expect(result.isVerified).toBeTruthy();
    });
    done();
  });

  test("Test reject review query", async (done) => {
    const review = await Review.findOne({ isVerified: true });

    await approveRejectReview(review._id, false).then((result) => {
      expect(result).toBeDefined();
      expect(result.isVerified).toBeFalsy();
    });
    done();
  });

  test("Test delete answer query", async (done) => {
    const review = await Review.findOne();

    await getReviewDetails(review._id).then(async (reviewAnswers) => {
      const answer = reviewAnswers[0].questions[0].answer._id;
      expect(answer).toBeDefined();
      const deletedAnswer = await deleteAnswer(answer);
      expect(deletedAnswer).toBeDefined();
      expect(deletedAnswer.deletedCount).toBe(1);
    });
    done();
  });
});
