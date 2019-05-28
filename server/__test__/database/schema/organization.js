const mongoose = require("mongoose");

const Organization = require("./../../../database/models/Organization");
const buildDB = require("./../../../database/dummyData");

describe("Test User schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("should Organization schema be defined", async () => {
    expect(Organization).toBeDefined();
  });

  // test("should Organization schema get data correctly", async () => {
  //   const organizations = await Organization.find();
  //   expect(organizations).toHaveLength(9);

  //   const companies = await Organization.find({ category: "company" });
  //   expect(companies).toHaveLength(2);
  // });

  test("should Organization schema store correctly", async () => {
    const organization = {
      name: "Recruitment Champion",
      category: "agency",
      phoneNumber: "+441235844101",
      email: "abingdon@Recruitment.co.uk",
      websiteURL: "http://www.Recruitment.co.uk/",
    };
    const StoredOrganization = await Organization.create(organization);
    expect(StoredOrganization).toBeDefined();
    expect(StoredOrganization.category).toBe(organization.category);
    expect(StoredOrganization.phoneNumber).toBe(organization.phoneNumber);
    expect(StoredOrganization.email).toBe(organization.email);
    expect(StoredOrganization.websiteURL).toBe(organization.websiteURL);
  });
});
