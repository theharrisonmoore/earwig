const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");
const app = require("../../../app");

const Organization = require("../../../database/models/Organization");

describe("Tesing for activate/deactivate organizations", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("Tesing for adding organizations route", async (done) => {
    const data = {
      email: "admin@earwig.com",
      password: "123456",
    };

    const currentOrgList = await Organization.find();

    const newOrgs = [
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
    ];

    // login with the origin password
    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        request(app)
          .post("/api/admin/organizations/add")
          .set("Cookie", [token])
          .send({ newOrgs })
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            const newOrgList = await Organization.find();
            expect(newOrgList.length).toBeGreaterThan(currentOrgList.length);
            done(err);
          });
      });
  });
});
