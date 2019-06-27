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
        phonenumber: 44777777777,
        webisiteURL: "https://companytest.com",
        email: "companytest@test.com",
      },
      {
        name: "Yalla Agency",
        category: "agency",
        phonenumber: 44777777777,
        webisiteURL: "https://agencytest.com",
        email: "agencytest@test.com",
      },
      {
        name: "Yalla Payroll",
        category: "payroll",
        phonenumber: 44777777777,
        webisiteURL: "https://payrolltest.com",
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
