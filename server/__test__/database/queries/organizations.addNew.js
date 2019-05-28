const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const { addNew } = require("../../../database/queries/organizations");

describe("test to addNew organization query", () => {
  beforeAll(async () => {
    await buildDB();
  });
  afterAll(() => {
    mongoose.disconnect();
  });

  test("it adds organisations  ", (done) => {
    addNew({
      name: "Yalla Builders",
      category: "company",
    }).then((company) => {
      expect(company).toBeDefined();
      expect(company.name).toBe("yalla builders");
      done();
    });
  });

  test("Test it allows duplicates", (done) => {
    addNew({ name: "Cardiff University", category: "agency" }).catch((err) => {
      expect(err).toBeDefined();
      done();
    });
  });
});
