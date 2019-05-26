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

  // test("Testing for delete organization", async (done) => {
  //   const organization = await Organization.findOne();

  // request(app)
  //   .post("/api/delete-organization")
  //   .send({ id: organization._id })
  //   .expect(200)
  //   .end(async (err, res) => {
  //     expect(res.body).toBeDefined();
  //     expect(res.body).toBe(0);
  //     expect(res.body.success).toBe("Organization successfully deleted");
  //     done(err);
  //   });
  // });

  test("test to create organisation", async (done) => {
    const user = {
      email: "level3@earwig.com",
      password: "123456",
    };
    const organization = await Organization.findOne();
    const data = {
      id: organization._id,
    };
    // login with the origin password
    request(app)
      .post("/api/login")
      .send(user)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        request(app)
          .delete("/api/delete-organization")
          .send(data)
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res.body).toBeDefined();
            expect(res.body.success).toBe("Organization successfully deleted");
            done(err);
          });
      });
  });
});
