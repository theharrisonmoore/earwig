const mongoose = require("mongoose");

const Job = require("./../../../database/models/Job");
const Trade = require("./../../../database/models/Trade");
const Organization = require("./../../../database/models/Organization");
const User = require("./../../../database/models/User");
const buildDB = require("./../../../database/dummyData");

describe("Test Job schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("should Job schema be defined", async () => {
    expect(Job).toBeDefined();
  });

  test("should Job schema get data correctly", async () => {
    const jobs = await Job.find();
    expect(jobs).toHaveLength(2);
  });

  test("should Job schema store correctly", async () => {
    const electricianTrade = await Trade.findOne({ title: "Electrician" });
    const companies = await Organization.find({ category: "company" });
    const agencies = await Organization.find({ category: "agency" });
    const worksites = await Organization.find({ category: "worksite" });
    const user = await User.findOne({ verified: true, isAdmin: false });

    const job = {
      title: "Electrician",
      description: "Inspection & testing electricians required across Manchester to start ASAP. Ongoing work.",
      trade: electricianTrade,
      rate: 25,
      hours: 8,
      startDate: "2019-05-1",
      company: companies[0],
      agency: agencies[0],
      worksite: worksites[0],
      favorites: [user],
      location: "Parkway, Manchester",
    };

    const storedJob = await Job.create(job);
    expect(storedJob.title).toBe(job.title);
    expect(storedJob.description).toBe(job.description);
    expect(storedJob.rate).toBe(job.rate);

    // default values
    expect(storedJob.isActive).toBeTruthy();
  });
});
