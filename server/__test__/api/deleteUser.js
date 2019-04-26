const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/dummyData");
const app = require("../../app");

describe("Tesing for delete user", () => {
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

  test("Testing for delete profile with logged in user", async (done) => {
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

        // update the user password
        request(app)
          .get("/api/delete-user")
          .set("Cookie", [token])
          .expect(200)
          .end(async (err, res) => {
            expect(res.body).toBeDefined();
            expect(res.body.success).toBe("User successfully deleted");

            // try to log in again
            // must fail to login
            request(app)
              .post("/api/login")
              .send(data)
              .expect("Content-Type", /json/)
              .expect(401)
              .end(async (error2, result2) => {
                expect(result2.body.error).toBe("login failed, email and password not match");
                done(error2);
              });
          });
      });
  });
});
