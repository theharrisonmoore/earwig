const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");

const { addNew } = require("../../../database/queries/user");

describe("Test for addNew user query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  // test("Test with correct inputs", (done) => {
  //   addNew({ email: "test@example.com", password: "123456" })
  //     .then((user) => {
  //       expect(user).toBeDefined();
  //       expect(user.email).toBe("test@example.com");
  //       done();
  //     });
  // });

  // test("Test with exsist email", (done) => {
  //   addNew({ email: "admin@earwig.com", password: "123456" })
  //     .catch((err) => {
  //       expect(err.message).toMatch("duplicate key error collection");
  //       done();
  //     });
  // });
});
