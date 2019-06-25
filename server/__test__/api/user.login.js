const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/dummyData/index");
const app = require("./../../app");

describe("Tesing for login route", () => {
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
      email: "admin@earwig.com",
      password: "123456",
    };

    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();

        expect(res.body.id).toBeDefined();
        expect(res.body.isAdmin).toBeTruthy();
        expect(res.headers["set-cookie"][0]).toMatch("token");
        done();
      });
  });

  test("test with invalid request email", (done) => {
    const data = {
      email: "Wrong@email.com",
      password: "123456",
    };

    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body.error).toMatch("Whoops! Either you typed something wrong or you're not registered.");
        done(err);
      });
  });
  test("test with invalid request password", (done) => {
    const data = {
      email: "admin@earwig.com",
      password: "123456563322",
    };

    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body.error).toMatch("Whoops! Either you typed something wrong or you're not registered.");
        done(err);
      });
  });
});
