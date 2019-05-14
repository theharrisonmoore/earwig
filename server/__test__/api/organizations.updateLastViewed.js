const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../database/dummyData/index");
const app = require("../../app");

const Organization = require("./../../database/models/Organization")

describe("Testing update last viewed route", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test route works to update view for organization", async (done) => {
    const orgDetails = await Organization.findOne();
    

    request(app)
      .post("/api/update-last-viewed")
      .send({id: orgDetails.id})
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        done(err);
      });

  });

});
