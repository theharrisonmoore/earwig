const request = require("supertest");
const mongoose = require("mongoose");

const User = require("./../../database/models/User");
const Trade = require("./../../database/models/Trade");
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

  test("test with correct email and password for worker", async (done) => {
    const trade = await Trade.findOne();
    const data = {
      email: "new@user.com",
      password: "123456",
      rePassword: "123456",
      checkbox: true,
      isWorker: "yes",
      trade: trade._id,
      city: "London",
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
        expect(res.body.awaitingReview).toBe(true);

        expect(res.headers["set-cookie"][0]).toMatch("token");
        done();
      });
  });

  test("test with correct email and password for not a worker", async (done) => {
    const data = {
      email: "new@user.com",
      password: "123456",
      rePassword: "123456",
      checkbox: true,
      isWorker: "no",
      orgType: "agency",
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
        expect(res.body.awaitingReview).toBe(false);

        expect(res.headers["set-cookie"][0]).toMatch("token");
        done();
      });
  });

  test("test with invalid data", async (done) => {
    const trade = await Trade.findOne();

    const data = {
      email: "Not eamil",
      password: "123456",
      rePassword: "123456",
      checkbox: true,
      isWorker: "yes",
      trade: trade._id,
      city: "London",
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


  test("test with valid referral", async (done) => {
    const referralUser = await User.findOne({ verified: true });
    const trade = await Trade.findOne();

    const data = {
      email: "test@email.com",
      password: "123456",
      rePassword: "123456",
      checkbox: true,
      referral: referralUser._id,
      isWorker: "yes",
      trade: trade._id,
      city: "London",
    };

    request(app)
      .post("/api/signup")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(400)
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


  test("test with invalid referral", async (done) => {
    const referralUser = await User.findOne({ verified: false });
    const trade = await Trade.findOne();

    const data = {
      email: "test@email.com",
      password: "123456",
      rePassword: "123456",
      checkbox: true,
      referral: referralUser._id,
      isWorker: "yes",
      trade: trade._id,
      city: "London",
    };

    request(app)
      .post("/api/signup")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body.error).toMatch("referral link isn't valid");
        done(err);
      });
  });
});
