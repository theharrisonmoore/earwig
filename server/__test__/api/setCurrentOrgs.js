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

  beforeEach(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  test("Tesing for successfully setting all the fields", async (done) => {
    const data = {
      email: "level2@earwig.com",
      password: "123456",
    };

    const currentAgency = await Organization.findOne({ category: "agency" })
    const currentPayroll = await Organization.findOne({ category: "payroll" })
    const currentWorksite = await Organization.findOne({ category: "worksite" })
    const currentCompany = await Organization.findOne({ category: "company" })

    // login with the origin password
    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        const currentOrgs = {
          currentAgency: currentAgency._id,
          currentPayroll: currentPayroll._id,
          currentWorksite: currentWorksite._id,
          currentCompany: currentCompany._id
        };

        request(app)
          .post("/api/set-current-orgs")
          .send(currentOrgs)
          .set("Cookie", [token])
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined()
            expect(res.body).toBeDefined()
            expect(res.body.currentAgency).toBe(`${currentAgency._id}`)
            expect(res.body.currentPayroll).toBe(`${currentPayroll._id}`)
            expect(res.body.currentWorksite).toBe(`${currentWorksite._id}`)
            expect(res.body.currentCompany).toBe(`${currentCompany._id}`)
            done(err)
          });
      });
  });

  test("Tesing for successfully setting some of the fields", async (done) => {
    const data = {
      email: "level2@earwig.com",
      password: "123456",
    };

    const currentAgency = await Organization.findOne({ category: "agency" })
    const currentPayroll = await Organization.findOne({ category: "payroll" })
    const currentWorksite = await Organization.findOne({ category: "worksite" })
    const currentCompany = await Organization.findOne({ category: "company" })

    // login with the origin password
    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        const currentOrgs = {
          currentAgency: currentAgency._id,
          currentPayroll: currentPayroll._id,
        };

        request(app)
          .post("/api/set-current-orgs")
          .send(currentOrgs)
          .set("Cookie", [token])
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined()
            expect(res.body).toBeDefined()
            expect(res.body.currentAgency).toBe(`${currentAgency._id}`)
            expect(res.body.currentPayroll).toBe(`${currentPayroll._id}`)
            expect(res.body.currentWorksite).toBe(null)
            done(err)
          });
      });
  });

  test("Tesing for successfully setting some of the fields then removing one", async (done) => {
    const data = {
      email: "level2@earwig.com",
      password: "123456",
    };

    const currentAgency = await Organization.findOne({ category: "agency" })
    const currentPayroll = await Organization.findOne({ category: "payroll" })
    const currentWorksite = await Organization.findOne({ category: "worksite" })
    const currentCompany = await Organization.findOne({ category: "company" })

    // login with the origin password
    request(app)
      .post("/api/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, result) => {
        const token = result.headers["set-cookie"][0].split(";")[0];

        const currentOrgs = {
          currentAgency: currentAgency._id,
          currentPayroll: currentPayroll._id,
        };

        request(app)
          .post("/api/set-current-orgs")
          .send(currentOrgs)
          .set("Cookie", [token])
          .expect(200)
          .end(async (err, res) => {
            expect(res).toBeDefined()
            expect(res.body).toBeDefined()
            expect(res.body.currentAgency).toBe(`${currentAgency._id}`)
            expect(res.body.currentPayroll).toBe(`${currentPayroll._id}`)
            expect(res.body.currentWorksite).toBe(null)

            const newCurrentOrgs = {
          currentAgency: currentAgency._id,
        };
            
            request(app)
              .post("/api/set-current-orgs")
              .send(newCurrentOrgs)
              .set("Cookie", [token])
              .expect(200)
              .end(async (err2, res2) => {
                expect(res2).toBeDefined()
                expect(res2.body).toBeDefined()
                expect(res2.body.currentAgency).toBe(`${currentAgency._id}`)
                expect(res2.body.currentPayroll).toBe(null)
                expect(res2.body.currentWorksite).toBe(null)
                done(err2)
              });
          });
      });
  });

  
});
