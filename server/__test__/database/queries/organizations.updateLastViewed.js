const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const { updateLastViewed } = require("../../../database/queries/organizations");

const Organization = require("./../../../database/models/Organization")

describe("test updateLastViewed organization query", () => {
  beforeAll(async () => {
    await buildDB();
  });
  afterAll(() => {
    mongoose.disconnect();
  });

  test("it updates the date of the organization", async (done) => {
    const orgDetails = await Organization.findOne();

    updateLastViewed(orgDetails.id).then(result => {
      expect(result).toBeDefined();
      expect(result.id).toBe(orgDetails.id);
      done()
    })


  });


});
