const mongoose = require("mongoose");
const buildDB = require("../../../database/dummyData/index");
const { addOrgs } = require("../../../database/queries/organizations/addOrganization");

const Organization = require("./../../../database/models/Organization");

describe("test to addOrgs organization query", () => {
  beforeAll(async () => {
    await buildDB();
  });
  afterAll(() => {
    mongoose.disconnect();
  });

  test("it adds organisations  ", async (done) => {
    const currentOrgList = await Organization.find();
    addOrgs([
      {
        name: "Yalla Builders",
        category: "company",
        phoneNumber: 44777777777,
        websiteURL: "https://companytest.com",
        email: "companytest@test.com",
      },
      {
        name: "Yalla Agency",
        category: "agency",
        phoneNumber: 44777777777,
        websiteURL: "https://agencytest.com",
        email: "agencytest@test.com",
      },
      {
        name: "Yalla Payroll",
        category: "payroll",
        phoneNumber: 44777777777,
        websiteURL: "https://payrolltest.com",
        email: "payrolltest@test.com",
      },
    ]).then(async () => {
      const newOrgList = await Organization.find();
      expect(newOrgList.length).toBeGreaterThan(currentOrgList.length);
      done();
    });
  });

  test("Test it allows duplicates", (done) => {
    addOrgs({ name: "Cardiff University", category: "agency" }).catch((err) => {
      expect(err).toBeDefined();
      done();
    });
  });
});
