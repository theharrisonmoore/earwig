const request = require("supertest");
const mongoose = require("mongoose");

const Organization = require("./../../../database/models/Organization");

const buildDB = require("../../../database/dummyData/index");
const app = require("../../../app");
const Review = require("../../../database/models/Review");

describe("Tesing for merge 2 profiles", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("merge 2 profiles", async (done) => {
    const companiesBefore = await Organization.find({ category: "company" });

    const toMergeProfileIdBefore = companiesBefore[0]._id;
    const toMergeProfileIntoIdBefore = companiesBefore[1]._id;

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
          .put(`/api/admin/organisations/merge?toMergeProfileId=${toMergeProfileIdBefore}&toMergeProfileIntoId=${toMergeProfileIntoIdBefore}`)
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined();
            const companiesAfter = await Organization.find({ category: "company" });
            const deletedCompany = await Organization.findById(toMergeProfileIdBefore);
            const reviewAfterMerging = await Review.findOne(
              { organization: toMergeProfileIntoIdBefore },
            );
            const tranferedReview = await Review.findOne({ organization: toMergeProfileIdBefore });

            // must be deleted
            expect(deletedCompany).toBeNull();
            expect(companiesBefore.length).toBe(companiesAfter.length + 1);

            // must be transfered
            expect(tranferedReview).toBeNull();
            expect(reviewAfterMerging).toBeDefined();

            done(err);
          });
      });
  });
});
