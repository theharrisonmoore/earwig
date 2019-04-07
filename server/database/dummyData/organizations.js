const Organization = require("../models/Organization");
const Question = require("./../models/Question");

module.exports = async () => {
  const companyQuestions = await Question.find({ orgType: "company" });
  const agencyQuestions = await Question.find({ orgType: "agency" });
  const payrollQuestions = await Question.find({ orgType: "payroll" });
  const worksiteQuestions = await Question.find({ orgType: "worksite" });

  const organizations = [
    // companies
    {
      name: "A A C Mechanical & Electrical",
      category: "company",
      phoneNumber: "07911123456",
      email: "hello@aac.uk.net",
      websiteURL: "https://www.aac.uk.net/",
      questions: [companyQuestions[0], companyQuestions[1], companyQuestions[2]],
      lastViewed: Date.now(),
    }, {
      name: "Abbey Builders",
      category: "company",
      phoneNumber: "07911654321",
      email: "hello@abbey-builders.com",
      websiteURL: "https://www.abbey-builders.com/",
      questions: [companyQuestions[0], companyQuestions[1], companyQuestions[2]],
      lastViewed: Date.now(),
    },
    // agecies
    {
      name: "Aspire Recruitment",
      category: "agency",
      phoneNumber: "+441612454942",
      email: "info@aspirerecruitment.org.uk",
      websiteURL: "http://aspirerecruitment.org.uk/",
      questions: [agencyQuestions[0], agencyQuestions[1], agencyQuestions[2]],
    }, {
      name: "Champion Recruitment",
      category: "agency",
      phoneNumber: "+441235844001",
      email: "abingdon@champion.co.uk",
      websiteURL: "http://www.champion.co.uk/",
      questions: [agencyQuestions[0], agencyQuestions[1], agencyQuestions[2]],
    },
    // payrolls
    {
      name: "Advanced Payroll Services",
      category: "payroll",
      phoneNumber: "+441733895576",
      email: "admin@advancedpayroll.org",
      websiteURL: "http://www.advancedpayroll.org/",
      questions: [payrollQuestions[0], payrollQuestions[1], payrollQuestions[2]],
    }, {
      name: "Liberty Bishop",
      category: "payroll",
      phoneNumber: "+441582461444",
      email: "info@libertybishop.co.uk",
      websiteURL: "https://www.libertybishop.co.uk/",
      questions: [payrollQuestions[0], payrollQuestions[1], payrollQuestions[2]],
    },
    // worksites
    {
      name: "Bournemouth University",
      category: "worksite",
      phoneNumber: "+441582461422",
      email: "info@Bournemouth.co.uk",
      websiteURL: "https://www.Bournemouth.co.uk/",
      contractor: {
        name: "MACE",
        logo: "contractors/contractor1.png",
      },
      loacation: {
        lat: 51.5074,
        long: 0.1278,
      },
      questions: [worksiteQuestions[0], worksiteQuestions[1], worksiteQuestions[2]],
    },
    {
      name: "Cardiff University",
      category: "worksite",
      phoneNumber: "+441582461411",
      websiteURL: "https://www.Cardiff.co.uk/",
      contractor: {
        name: "OHAW",
        logo: "contractors/contractor2.png",
      },
      loacation: {
        lat: 51.5274,
        long: 0.1368,
      },
      questions: [worksiteQuestions[0], worksiteQuestions[1], worksiteQuestions[2]],
    },
  ];
  return Organization.create(organizations);
};
