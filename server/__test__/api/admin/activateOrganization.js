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

  test("Tesing for activate/deactivate organization route", async (done) => {
    const data = {
      email: "admin@earwig.com",
      password: "123456",
    };

    const organization = await Organization.findOne();

    expect(organization.active).toBeTruthy();

    // login with the origin password
    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        request(app)
          .patch("/api/admin/organizations/")
          .send({ id: organization._id, active: false })
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            const updateOrganization = await Organization.findOne();
            expect(updateOrganization.active).toBeFalsy();
            done(err);
          });
      });
  });
});
