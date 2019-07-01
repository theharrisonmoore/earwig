const mongoose = require("mongoose");

const buildDB = require("../../../database/dummyData/index");

const Trade = require("../../../database/models/Trade")
const { editTrade } = require("../../../database/queries");

describe("Test for editTrade query", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done()
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test editTrades", async (done) => {
    const trade = await Trade.findOne();

    editTrade(trade.title, "New Trade Name").then(async () => {
      const newTrade = await Trade.findOne({title: "New Trade Name"})

      expect(newTrade).toBeDefined()
      expect(newTrade.title).toBe("New Trade Name")
      done()
    })
    
  });
});
