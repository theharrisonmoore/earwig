const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../database/dummyData");
const app = require("../../app");

describe("Testing for feedback", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await buildDB();
  });

  test("Testing with logged in user", async (done) => {
    const data = { email: "level3-2@earwig.com", password: "123456" };

    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        const formData = {
          message: "Here's some feeback for you",
          page: "/faq",
        };

        request(app)
          .post("/api/give-feedback")
          .set("Cookie", [token])
          .send(formData)
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res.body).toBeDefined();
            expect(res.body.message).toBe("Message sent");
            expect(res.body.page).toBeDefined();
            done(err);
          });
      });
  });

  test("Testing with logged out user", async (done) => {
    const formData = { message: "Here's some feedback for you" };

    request(app)
      .post("/api/give-feedback")
      .send(formData)
      .expect("Content-Type", /json/)
      .expect(401)
      .end(async (err, res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toBe("no credentials");
        done(err);
      });
  });
});
