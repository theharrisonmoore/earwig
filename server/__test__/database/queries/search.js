const mongoose = require("mongoose");
const buildDB = require("./../../../database/dummyData");

const searchQuery = require("./../../../database/queries/search");

describe("Test for search query", () => {
  beforeAll(async () => {
    await buildDB();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  beforeEach(async () => {
    await buildDB();
  });

  test("test with valid request", (done) => {
    searchQuery("agency").then((result) => {
      expect(result).toBeDefined();
      expect(result.length).toBeDefined();
      expect(result[0].searchData).toBeDefined();
      expect(result[0].searchData[0].avgRatings).toBeDefined();
      done();
    });
  });
});
