const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../database/dummyData/index");
const app = require("../../app");

const user = {
  email: "level2@earwig.com",
  password: "123456",
};
describe("Tesing for get report content", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test for report content with valid data", (done) => {
    const data = {
      reason: "reason as string",
      description: "description as string",
      target: "target as string",
      question: { any: "any" },
      organization: { any: "any" },
      review: { any: "any" },
      comment: { any: "any" },
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
          .post("/api/report-content")
          .send(data)
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body.message).toBe("sent");
            done(err);
          });
      });
  });

  test("test for report content with invalid data", (done) => {
    const data = {
      description: "description as string",
      target: "target as string",
      question: { any: "any" },
      organization: { any: "any" },
      review: { any: "any" },
      comment: { any: "any" },
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
          .post("/api/report-content")
          .send(data)
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(400)
          .end((err, res) => {
            expect(res.body.error).toMatch("\"reason\" is required");
            done(err);
          });
      });
  });
});
