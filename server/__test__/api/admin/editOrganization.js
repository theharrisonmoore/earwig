const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");
const app = require("../../../app");

const Organization = require("../../../database/models/Organization");

describe("Tesing to edit existing organization", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("Tesing for activate/deactivate organization route", async (done) => {
    const data = {
      email: "admin@earwig.com",
      password: "123456",
    };

    const organization = await Organization.findOne();

    // manually edit organization
    const newOrgData = organization;
    newOrgData.name = "Updated Organization";

    // login with the origin password
    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        request(app)
          .post("/api/admin/organizations/edit")
          .send({ newOrgData })
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            const updatedOrganization = await Organization.findById(organization._id);
            expect(updatedOrganization.name).toBe("Updated Organization");
            done(err);
          });
      });
  });
});
