const mongoose = require("mongoose");

const Review = require("./../../../database/models/Review");
const buildDB = require("./../../../database/dummyData");
const Organization = require("./../../../database/models/Organization");
const User = require("./../../../database/models/User");

describe("Test Review schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("should Review schema be defined", async () => {
    expect(Review).toBeDefined();
  });

  test("should Review schema get data correctly", async () => {
    const review = await Review.find();
    expect(review).toHaveLength(8);
  });

  test("should Review schema store correctly", async () => {
    const companies = await Organization.find({ type: "company" });
    const users = await User.find({ verified: true, isAdmin: false });

    const review = {

      organization: companies[0],
      user: users[0],
      workPeriod: {
        from: "2019-01-01",
        to: "2019-03-31",
      },
      rate: 2,
      overallReview: {
        text: "I had problem gitting paid",
        replies: [
          {
            user: users[1],
            text: "I faced the same thing",
          },
        ],
        votes: [{
          user: users[1],
          points: 8,
        }],
      },
      voiceReview: {
        audio: "audio/audio1.mp3", // to be updated when firebase storage is ready
        replies: [{
          user: users[1],
          text: "you are right",
        }],
        votes: [{
          user: users[1],
          points: 5,
        }],
      },
    };

    const storedReviews = await Review.create(review);
    expect(storedReviews).toBeDefined();
    expect(storedReviews.rate).toBe(review.rate);
    expect(storedReviews.overallReview.text).toBe(review.overallReview.text);


    // default values
    expect(storedReviews.createdAt).toBeDefined();
    expect(storedReviews.updatedAt).toBeDefined();
    expect(storedReviews.isVerified).toBeFalsy();
  });
});
