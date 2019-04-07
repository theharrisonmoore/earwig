const Question = require("../models/Question");
const Organization = require("../models/Organization");
const User = require("../models/User");

module.exports = async () => {
  const agencyQuestions = await Question.find({ orgType: "agency" });
  const payrollQuestions = await Question.find({ orgType: "payroll" });
  const companyQuestions = await Question.find({ orgType: "company" });
  const worksiteQuestions = await Question.find({ orgType: "worksite" });

  const agencies = await Organization.find({ type: "agency" });
  const companies = await Organization.find({ type: "company" });
  const payrolls = await Organization.find({ type: "payroll" });
  const worksites = await Organization.find({ type: "worksite" });

  const users = await User.find({ verified: true, isAdmin: false });

  const comments = [
    {
      organization: agencies[0],
      question: agencyQuestions[0],
      user: users[0],
      text: "The contract was misleading and tricky",
    },
    {
      organization: agencies[0],
      question: agencyQuestions[18],
      user: users[1],
      text: "This is a shity agency I wouldn't work with them again",
    },
    {
      organization: agencies[0],
      question: agencyQuestions[18],
      user: users[0],
      text: "Bad company, stay away",
    },
    {
      organization: agencies[0],
      question: agencyQuestions[18],
      user: users[1],
      text: "Good company",
    },
  ];
};
