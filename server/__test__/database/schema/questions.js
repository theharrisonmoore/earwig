const mongoose = require("mongoose");

const Question = require("../../../database/models/Question");
const buildDB = require("../../../database/dummyData");

/**
 * @jest-environment node
 */

describe("Test Question schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("should Question schema be defined", async () => {
    expect(Question).toBeDefined();
  });

  test("should Question schema get data correctly", async () => {
    const questions = await Question.find();

    expect(questions).toHaveLength(56);
  });

  test("should Question schema store correctly", async () => {
    const question = {
      number: 1,
      type: "testType",
      text: "Did they send you written confirmation of the terms and conditions of employment?",
      hintText:
        "i.e., details of pay, overtime, mileage/travel allowance, lodging provision, holiday entitlement, disciplinary procedures, benefits, etc.",
      isJumping: true,
      jumpTo: [{ value: "yes", nextQuestion: 2 }, { value: "no", nextQuestion: 3 }],
      options: ["yes", "no"],
      category: "agency",
    };

    const StoredQuestion = await Question.create(question);
    expect(StoredQuestion).toBeDefined();

    expect(StoredQuestion.number).toBe(question.number);
    expect(StoredQuestion.category).toBe(question.category);
    expect(StoredQuestion.type).toBe(question.type);
    expect(StoredQuestion.text).toBe(question.text);
  });
});
