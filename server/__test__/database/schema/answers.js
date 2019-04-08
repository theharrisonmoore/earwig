const mongoose = require("mongoose");

const Review = require("./../../../database/models/Review");
const Organization = require("./../../../database/models/Organization");
const User = require("./../../../database/models/User");
const Answer = require("./../../../database/models/Answer");
const Comment = require("./../../../database/models/Comment");
const Question = require("./../../../database/models/Question");

const buildDB = require("../../../database/dummyData");

describe("Test Answer schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("should Answer schema be defined", async () => {
    expect(Answer).toBeDefined();
  });

  test("should Answer schema get data correctly", async () => {
    const answers = await Answer.find()
    expect(answers).toHaveLength(104);
  });
  
  test("should Answer schema store correctly", async () => {

    const agencyQuestions = await Question.find({ category: "agency" }).sort({ number: 1 });
    const agency = await Organization.find({ name: "A A C Mechanical & Electrical" });
    const users = await User.find({ verified: true, isAdmin: false });
    const comments = await Comment.find();
    const reviews = await Review.find({ user: users[0] });

    const answer = {
      question: agencyQuestions[0],
      answer: "no",
      comment: comments[0],
      user: users[0],
      review: reviews[0],
    }
  
    const StoredAnswer = await Answer.create(answer);

    expect(StoredAnswer).toBeDefined();
    expect(StoredAnswer.user.verified).toBe(true);
    expect(StoredAnswer.answer).toBe("no");
    expect(StoredAnswer.question.type).toBe("yesno");
  });
});
