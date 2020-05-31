const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");

const { getSignedUpReferrals } = require("../../../database/queries/user");

const User = require("../../../database/models/User");

describe("Test getting the number of people signed up via a users referral query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test with correct eamil", async (done) => {
    const user = await User.findOne({ email: "ref1@earwig.com" });
    const result = await getSignedUpReferrals(user._id);
    expect(result).toBeDefined();
    expect(result).toBe(2);
    done();
  });
});
