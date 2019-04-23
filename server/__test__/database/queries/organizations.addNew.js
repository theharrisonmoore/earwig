const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const { addNew, findByName } = require("../../../database/queries/organizations");

describe("test to addNew organization query", () => {
  beforeAll(async () => {
    await buildDB();
  });
  afterAll(() => {
    mongoose.disconnect();
  });

  test("it finds an organisation that exists", (done) => {
    findByName("Cardiff University").then((worksite) => {
      expect(worksite).toBeDefined();
      expect(worksite.name).toBe("Cardiff University");
      done();
    });
  });

  test("it adds organisations that don't exist", (done) => {
    addNew({
      name: "Yalla Builders",
      category: "company",
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
