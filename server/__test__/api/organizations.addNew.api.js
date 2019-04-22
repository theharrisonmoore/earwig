const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../database/dummyData/index");
const app = require("../../app");

const user = {
  email: "level3@earwig.com",
  password: "123456",
};
describe("Tesing for get add organisation route", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test to create organisation with name that already exists", (done) => {
    const dataInvalid = {
      name: "Cardiff University",
      category: "agency",
      isVerified: false,
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
          .post("/api/add-organization")
          .send(dataInvalid)
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(500)
          .end((err, res) => {
            expect(err).toBeDefined();
            done(err);
          });
      });
  });

  test("test to create organisation with name that doesn't already exist", (done) => {
    const dataValid = {
      name: "Yalla Builders",
      category: "agency",
      verified: false,
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
          .post("/api/add-organization")
          .send(dataValid)
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            expect(res.body.name).toBe("Yalla Builders");
            done(err);
          });
      });
  });
});