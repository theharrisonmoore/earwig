const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");

const { findByEmail } = require("./../../../database/queries/user");

const User = require("../../../database/models/User");

describe("Test for getUserCard query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test with correct eamil", async (done) => {
    const admin = await User.findOne({ isAdmin: true });
    findByEmail(admin.email)
      .then((user) => {
        expect(user).toBeDefined();
        expect(user.email).toBe(admin.email);
        done();
      });
  });

  test("Test with unexist email", async (done) => {
    findByEmail("wrong@eamil.com")
      .then((user) => {
        expect(user).toBeNull();
        done();
      });
  });
});
