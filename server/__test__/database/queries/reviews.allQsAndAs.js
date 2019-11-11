const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const { allQsAndAs } = require("../../../database/queries/reviews");

const Organization = require("../../../database/models/Organization");
const Review = require("../../../database/models/Review");

describe("Test overallReview query", () => {
  beforeAll(async (done) => {
    await buildDB();
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test with correct organization ID", async (done) => {
    const review = await Review.findOne();
    const organizationID = review.organization;
    const organization = await Organization.findById(organizationID);

    allQsAndAs(organization.category, organizationID).then((result) => {
      expect(result).toBeDefined();
      expect(result[0].questions[0].answers).toBeDefined();
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
