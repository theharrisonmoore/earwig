const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");
const app = require("../../../app");

describe("Testing profile route", () => {
  beforeAll(async (done) => {
    await buildDB();
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("test with admin", async (done) => {
    const user = {
      email: "admin@earwig.com",
      password: "123456",
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
          .get("/api/admin/export-all-reviews")
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            expect(res.body.cleanedReviews[0]).toBeDefined();
            expect(res.body.cleanedReviews[0]["Last Use"]).toBeDefined();
            expect(res.body.headers).toBeDefined();
            done(err);
          });
      });
  });
});
