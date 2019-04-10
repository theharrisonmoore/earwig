const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const { checkOrgExists } = require("../../../database/queries/reviews");

// const Organization = require("../../../database/models/Organization");
const Organization = require("../../../database/models/Organization");

describe("Test checkOrgExists query", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test with correct organization ID", async (done) => {
    const organization = await Organization.findOne();

    checkOrgExists(organization.id).then((result) => {
      expect(result).toBeDefined();
      expect(result.id).toEqual(organization.id);
      done();
    });
  });

  test("Test with incorrect organization ID", async (done) => {
    checkOrgExists("511111111111111111111111").then((result) => {
      expect(result).toBe(null);
      done();
    });
  });

  test("Throws error when incorrect type of argument", async (done) => {
    checkOrgExists(21313).catch((err) => {
      expect(err).toBeDefined();
      done();
    });
  });
});
