const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/dummyData");
const app = require("../../app");

const User = require("./../../database/models/User");
const Organization = require("./../../database/models/Organization")

describe("Tesing for setting current organizations", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Tesing for successfully getting all the fields", async (done) => {
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
          .get("/api/get-current-orgs")
          .set("Cookie", [token])
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined()
            expect(res.body).toBeDefined()
            expect(res.body.agency).toBeDefined()
            expect(res.body.payroll).toBeDefined()
            expect(res.body.worskite).toBeDefined()
            expect(res.body.company).toBeDefined()
            done(err)
          });
      });
  });
  
});
