const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");

const { updateUserById } = require("../../../database/queries/user");

const User = require("../../../database/models/User");

describe("Test for updateUserById query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test updateUserById", async (done) => {
    const user = await User.findOne({ isAdmin: false, verified: false, awaitingReview: false });
    await updateUserById(user._id, { awaitingReview: true, verificationPhoto: "test.png" });
    const updatedUser = await User.findById(user._id);
    expect(updatedUser._id).toEqual(user._id);
    expect(updatedUser.awaitingReview).toBeTruthy();
    expect(updatedUser.verificationPhoto).toBe("test.png");
    done();
  });
});
