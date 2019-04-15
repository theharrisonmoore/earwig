const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../database/dummyData/index");
const app = require("../../app");

describe("Tesing for Signup route", () => {
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

  test("test with correct email and password", (done) => {
    const data = {
      email: "new@user.com",
      password: "123456",
      rePassword: "123456",
      checkbox: true,
    };

    request(app)
      .post("/api/signup")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.id).toBeDefined();
        expect(res.body.isAdmin).toBeFalsy();
        expect(res.body.userId).toBeTruthy();
        expect(res.body.points).toBe(0);

        expect(res.headers["set-cookie"][0]).toMatch("token");
        done();
      });
  });

  test("test with invalid data", (done) => {
    const data = {
      email: "Not eamil",
      password: "123456",
      rePassword: "123456",
      checkbox: true,
    };

    request(app)
      .post("/api/signup")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body.error).toMatch("\"email\" must be a valid email");
        done(err);
      });
  });
});
