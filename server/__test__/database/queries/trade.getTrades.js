const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");

const { getTrades } = require("../../../database/queries");

describe("Test for getTrades query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test  getTrades", async (done) => {
    const trades = await getTrades();
    expect(trades).toHaveLength(10);
    expect(trades[0].title).toBeTruthy();
    done();
  });
});
