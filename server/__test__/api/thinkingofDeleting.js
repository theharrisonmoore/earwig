const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../database/dummyData");
const app = require("../../app");

describe("Testing for thinkingOfDeleting", () => {
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

  test("Testing with logged in user", async (done) => {
    const data = {
      email: "level3-2@earwig.com",
      password: "123456",
    };

    // login with the origin password
    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        const formData = {
          message: "I'm thinking of leaving",
        };

        request(app)
          .post("/api/thinking-of-deleting")
          .set("Cookie", [token])
          .send(formData)
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res.body).toBeDefined();
            done(err);
          });
      });
  });
});
