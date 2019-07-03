const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const allReviewsIncAnswers = require("../../../database/queries/reviews/allReviewsIncAnswers");

const Organization = require("../../../database/models/Organization");

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
      expect(result[0].entityName).toBeDefined();
      expect(result[0].givenReviews).toBeDefined();
      expect(result[0].workedFrom).toBeDefined();
      expect(result[0].trade).toBeDefined();
      expect(result[0].peopleHelped).toBeDefined();
      expect(result[0].userId).toBeDefined();
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
