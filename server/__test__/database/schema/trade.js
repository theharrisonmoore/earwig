const mongoose = require("mongoose");

const Trade = require("./../../../database/models/Trade");
const buildDB = require("./../../../database/dummyData");

describe("Test Trade schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("should Trade schema be defined", async () => {
    expect(Trade).toBeDefined();
  });

  test("should Trade schema get data correctly", async () => {
    const trade = await Trade.find();
    expect(trade).toHaveLength(10);
  });

  test("should Trade schema store correctly", async () => {
    // reset trade documents
    await Trade.deleteMany();

    const trades = [{
      title: "Audio visual engineer",
    }, {
      title: "Bricklayer",
    }, {
      title: "Carpenter",
    }, {
      title: "Carpet layer",
    }];

    const storedTrades = await Trade.create(trades);
    expect(storedTrades).toBeDefined();

    expect(storedTrades).toHaveLength(4);

    // default values
    expect(storedTrades[0].createdAt).toBeDefined();
    expect(storedTrades[0].updatedAt).toBeDefined();
  });
});
