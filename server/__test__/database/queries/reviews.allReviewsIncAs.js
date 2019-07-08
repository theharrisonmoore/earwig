const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const allReviewsIncAnswers = require("../../../database/queries/reviews/allReviewsIncAnswers");

describe("Test getAllReviewsIncAnswers query", () => {
  beforeAll(async (done) => {
    await buildDB();
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test it works correctly", async (done) => {
    // const review = await Review.findOne();
    // const organizationID = review.organization;
    // const organization = await Organization.findById(organizationID)

    allReviewsIncAnswers().then((result) => {
      expect(result).toBeDefined();
      expect(result[0].answers).toBeDefined();
      expect(result[0].answers[0].answer).toBeDefined();
      expect(result[0]["Entity name"]).toBeDefined();
      expect(result[0]["Reviews given"]).toBeDefined();
      expect(result[0]["Date from"]).toBeDefined();
      expect(result[0]["Points earned"]).toBeDefined();
      expect(result[0]["People helped"]).toBeDefined();
      done();
    });
  });

  // test("Test with incorrect organization ID", async (done) => {
  //   allAnswers(1111111111).then((result) => {
  //     expect(result).toBeDefined();
  //     expect(result.length).toBe(0);
  //     done();
  //   });
  // });
});
