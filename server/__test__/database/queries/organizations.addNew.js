const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const { addNew } = require("../../../database/queries/organization");

describe("test to addNew organization query", () => {
  beforeAll(async () => {
    await buildDB();
  });
  afterAll(() => {
    mongoose.disconnect();
  });

  test("it adds organisations that don't exist", (done) => {
    addNew({
      name: "Yalla Builders",
      category: "company",
      verified: false,
    }).then((company) => {
      expect(company).toBeDefined();
      expect(company.name).toBe("Yalla Builders");
      done();
    });
  });
  test("Test with exsisting name", (done) => {
    addNew({ name: "Cardiff University", category: "agency" }).catch((err) => {
      expect(err.message).toMatch("duplicate key error collection");
      done();
    });
  });
});
