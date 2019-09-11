const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");

const { deleteUserFields, findByIdAndUpdate, updateUserById } = require("../../../database/queries/user");

const User = require("../../../database/models/User");
const Organization = require("../../../database/models/Organization");

describe("Test for updateUserById query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test updateUserById", async (done) => {

    const currentAgency = await Organization.findOne({ category: "agency" })
    const currentPayroll = await Organization.findOne({ category: "payroll" })
    const user = await User.findOne();

    await updateUserById(user._id, { currentAgency: currentAgency._id, currentPayroll: currentPayroll._id });
    const updatedUser = await User.findById(user._id);
    expect(updatedUser._id).toEqual(user._id);
    expect(updatedUser.currentPayroll).toEqual(currentPayroll._id);
    expect(updatedUser.currentAgency).toEqual(currentAgency._id);

    await deleteUserFields(user._id, { currentAgency: "", currentPayroll: ""});
    const newUpdatedUser = await User.findById(user._id);
    expect(newUpdatedUser._id).toEqual(user._id);
    expect(newUpdatedUser.currentPayroll).toBeUndefined();
    expect(newUpdatedUser.currentAgency).toBeUndefined();

    done();
  });

  // test("Test updateUserById - update username", async (done) => {
  //   const user = await User.findOne({ isAdmin: false });
  //   await updateUserById(user._id, { userId: "test12345" });
  //   const updatedUser = await User.findById(user._id);
  //   expect(updatedUser._id).toEqual(user._id);
  //   expect(updatedUser.userId).toBe("test12345");
  //   done();
  // });
});