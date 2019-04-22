const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");
const app = require("../../../app");

const User = require("./../../../database/models/User");

describe("Tesing for delete user route", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test for delete user", async (done) => {
    const data = {
      email: "admin@earwig.com",
      password: "123456",
    };

    const userToBeDelted = await User.findOne({ email: "level2@earwig.com" });

    // login with the origin password
    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        request(app)
          .delete("/api/admin/users")
          .set("Cookie", [token])
          .send({ id: userToBeDelted._id })
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();

            const deletedUser = await User.findOne({ email: "level2@earwig.com" });
            expect(deletedUser).toBeNull();
            done(err);
          });
      });
  });
});
