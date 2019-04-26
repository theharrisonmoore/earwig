const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");

const { deleteUser } = require("../../../database/queries/user");

const User = require("../../../database/models/User");
const Comment = require("../../../database/models/Comment");
const Review = require("../../../database/models/Review");
const Answer = require("../../../database/models/Answer");

describe("Test for deleteUser user query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test with correct inputs", async (done) => {
    const reviewInfo = await Review.findOne({});
    const userId = reviewInfo.user;
    const userReviews = await Review.find({ user: userId });
    const userComments = await Comment.find({ user: userId });
    const userAnswers = await Answer.find({ user: userId });

    expect(userId).toBeDefined();
    expect(userReviews.length).toBeGreaterThan(0);
    expect(userComments.length).toBeGreaterThan(0);
    expect(userAnswers.length).toBeGreaterThan(0);

    deleteUser(userId)
      .then((result) => {
        expect(result).toBeDefined();
      })
      .then(async () => {
        const foundUser = await User.findById(userId);
        const foundReviews = await Review.find({ user: userId });
        const foundComments = await Comment.find({ user: userId });
        const foundAnswers = await Answer.find({ user: userId });
        expect(foundUser).toBe(null);
        expect(foundReviews.length).toBe(0);
        expect(foundComments.length).toBe(0);
        expect(foundAnswers.length).toBe(0);
        done();
      });
  });
});
