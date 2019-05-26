const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../database/dummyData");
const app = require("../../app");

const Organization = require("../../database/models/Organization");

describe("Testing for delete organization", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // build dummy data
    await buildDB();
  });

  test("test to create organisation", async (done) => {
    const user = {
      email: "level3@earwig.com",
      password: "123456",
    };
    const organization = await Organization.findOne();

    // login with the origin password
    request(app)
      .post("/api/login")
      .send(user)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        request(app)
          .delete(`/api/delete-organization/${organization.name}`)
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res.body).toBeDefined();
            expect(res.body.success).toBe("Organization successfully deleted");
            const deletedOrg = await Organization.find({ name: organization.name });
            expect(deletedOrg.length).toBe(0);
            done(err);
          });
      });
  });
});
