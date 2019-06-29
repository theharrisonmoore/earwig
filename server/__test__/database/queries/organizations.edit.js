const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const { updateOrgsById } = require("../../../database/queries/organizations");

const Organization = require("./../../../database/models/Organization");

describe("test to addNew organization query", () => {
  beforeAll(async () => {
    await buildDB();
  });
  afterAll(() => {
    mongoose.disconnect();
  });

  test("it edits organisations  ", async (done) => {
    const organization = await Organization.findOne();

    organization.name = "Updated organization";

    updateOrgsById(organization._id, organization).then(async () => {
      const updatedOrg = await Organization.findById(organization._id);
      expect(updatedOrg.name).toBe("Updated organization");
      done();
    });
  });
});
