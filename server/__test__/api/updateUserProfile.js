const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/dummyData");
const app = require("../../app");

const User = require("./../../database/models/User");

describe("Tesing for update profile", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  beforeEach(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  test("Tesing for update profile", async (done) => {
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

        const editData = {
          oldPassword: "123456",
          newPassword: "654321",
          reNewPassword: "654321",
        };

        // update the user password
        request(app)
          .post("/api/edit-profile")
          .send(editData)
          .set("Cookie", [token])
          .expect(200)
          .end(async () => {
            const wrongeData = {
              email: "level3@earwig.com",
              password: "123456",
            };

            // try to log in with the old password
            // must fail to login
            request(app)
              .post("/api/login")
              .send(wrongeData)
              .expect("Content-Type", /json/)
              .expect(401)
              .end(async (error2, result2) => {
                expect(result2.body.error).toMatch(
                  "Whoops! Either you typed something wrong or you're not registered.",
                );
                done(error2);
              });
          });
      });
  });

  test("Testing for update username", async (done) => {
    const data = {
      email: "level3@earwig.com",
      password: "123456",
    };

    // login
    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        const editData = {
          newUsername: "test12345",
        };

        // update the user password
        request(app)
          .post("/api/edit-profile")
          .set("Cookie", [token])
          .send(editData)
          .expect(200)
          .end(async (err, res) => {
            const userInfo = await User.findOne({ email: "level3@earwig.com" });
            expect(userInfo.userId).toBe(editData.newUsername);
            done(err);
          });
      });
  });
});
