const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/dummyData/index");
const app = require("./../../app");

const Comment = require("./../../database/models/Comment");

describe("Testing comments route", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await buildDB();
  });

  test("test with correct organization id and question id", async (done) => {
    const comment = await Comment.findOne();

    request(app)
      .get(`/api/comments?organizationID=${comment.organization}&questionID=${comment.question}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body[0].organization).toBeDefined();
        expect(res.body[0].userId).toBeDefined();
        done();
      });
  });
});
