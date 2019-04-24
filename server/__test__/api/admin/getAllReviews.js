const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");
const app = require("../../../app");

describe("Tesing for get all reviews route", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test for get all reviews route", async (done) => {
    const data = {
      email: "admin@earwig.com",
      password: "123456",
    };

    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        request(app)
          .get("/api/admin/reviews")
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();

            expect(res.body[0].user).toBeDefined();
            expect(res.body[0].organization).toBeDefined();
            expect(typeof res.body[0].rate).toBe("number");
            done(err);
          });
      });
  });
});
