const mongoose = require("mongoose");
const buildDB = require("./../../../database/dummyData");

const searchQuery = require("./../../../database/queries/search");

const searchInputs = {
  valid: "A A C Mechanical & Electrical",
  invalid: "fake input",
};

describe("Test for search query", () => {
  beforeAll(async () => {
    await buildDB();
  });
  afterAll(() => {
    mongoose.disconnect();
  });
  test("test with valid input", async (done) => {
    searchQuery(searchInputs.valid).then((result) => {
      expect(result[0]).toBeDefined();
      expect(result[0].category).toBe("company");
      expect(result[0].avgRatings).toBe(1.5);
      done();
    });
  });
});
