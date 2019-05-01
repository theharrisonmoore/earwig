const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");
const app = require("../../../app");

describe("Tesing for get all users route", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test for get all users route", async (done) => {
    const data = {
      email: "admin@earwig.com",
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
          .get("/api/admin/users")
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            // expect(res.body).toHaveLength(4);

            expect(res.body[0].email).toBeDefined();
            expect(res.body[0].userId).toBeDefined();
            expect(res.body[0].status).toBeDefined();
            expect(res.body[0].key).toBeDefined();
            done(err);
          });
      });
  });
});
