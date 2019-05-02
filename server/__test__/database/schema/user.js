const mongoose = require("mongoose");
const { compare } = require("bcryptjs");

const User = require("./../../../database/models/User");
const Trade = require("./../../../database/models/Trade");
const buildDB = require("./../../../database/dummyData");

describe("Test User schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("should User schema be defined", async () => {
    expect(User).toBeDefined();
  });

  // test("should User schema get data correctly", async () => {
  //   const users = await User.find();
  //   expect(users).toHaveLength(5);

  //   const admins = await User.find({ isAdmin: true });
  //   expect(admins).toHaveLength(1);
  // });

  test("should User schema store correctly", async (done) => {
    const trade = await Trade.findOne();
    const user = {
      email: "test@earwig.com",
      password: "123456",
      trade,
      awaitingReview: false,
    };
    const storedUser = await User.create(user);
    expect(storedUser).toBeDefined();

    // default values
    expect(storedUser.verified).toBeFalsy();
    expect(storedUser.points).toBe(0);
    expect(storedUser.isAdmin).toBeFalsy();
    expect(storedUser.awaitingReview).toBeFalsy();

    // hashing password
    compare(user.password, storedUser.password).then((isTrue) => {
      expect(isTrue).toBeTruthy();
      done();
    });
  });
});
