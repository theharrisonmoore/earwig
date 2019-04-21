const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const { allComments } = require("../../../database/queries/reviews");

// const Organization = require("../../../database/models/Organization");
const Review = require("../../../database/models/Review");
const Comment = require("../../../database/models/Comment")

describe("Test allComments query", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test with correct organization ID", async (done) => {
    const comment = await Comment.findOne();
    const organizationID = comment.organization;
    const questionID = comment.question;

    allComments(organizationID, questionID).then((result) => {
      expect(result).toBeDefined();
      expect(result[0].organization).toEqual(organizationID);
      expect(result[0].text).toBeDefined()
      done();
    });
  });


});
