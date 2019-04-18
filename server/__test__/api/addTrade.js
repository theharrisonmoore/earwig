const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../database/dummyData/index");
const app = require("../../app");

describe("Tesing for add trades route", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test for add trade", (done) => {
    const data = {
      email: "level3@earwig.com",
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

        request(app)
          .post("/api/trades")
          .send({
            trade: "new trade test",
          })
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            expect(res.body.title).toBe("new trade test");
            expect(res.body._id).toBeDefined();
            done(err);
          });
      });
  });
});
