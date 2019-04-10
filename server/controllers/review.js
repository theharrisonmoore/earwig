const boom = require("boom");

// const { getQuestionsByAgency } = require("./../database/queries/user");
const Question = require("../database/models/Question");


module.exports = (req, res, next) => {
  Question.find({ category: "agency" }).sort({ number: 1 })
    .then((questions) => {
      res.json(questions);
    })
    .catch((err) => {
      next(Boom.badImplementation());
    });
  // getQuestionsByAgency("agency").then((questions) => {
  //   console.log("hii", questions);
  // });
};
