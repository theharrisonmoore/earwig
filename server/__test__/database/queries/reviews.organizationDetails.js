const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const { organizationDetails } = require("./../../../database/queries/reviews");

const Organization = require("../../../database/models/Organization");

describe("Test totalReviews query", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test with correct organization ID", async (done) => {
    const organization = await Organization.findOne();

    organizationDetails(organization.id).then((result) => {
      expect(result).toBeDefined();
      expect(result.id).toBe(organization.id);
      done();
    });
  });
});
