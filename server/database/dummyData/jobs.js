const Job = require("./../models/Job");
const Trade = require("./../models/Trade");
const Organization = require("./../models/Organization");
const User = require("./../models/User");

module.exports = async () => {
  const electricianTrade = await Trade.findOne({ title: "Electrician" });
  const companies = await Organization.find({ type: "company" });
  const agencies = await Organization.find({ type: "agency" });
  const worksites = await Organization.find({ type: "worksite" });
  const user = await User.findOne({ verified: true, isAdmin: false });

  const jobs = [
    {
      titile: "Electrician",
      description: "Inspection & testing electricians required across Manchester to start ASAP. Ongoing work.",
      trade: electricianTrade,
      rate: 25,
      hours: 8,
      startDate: "2019-05-1",
      company: companies[0],
      agency: agencies[0],
      worksite: worksites[0],
      favorites: [user],
      location: "Parkway, Manchester",
    }, {
      titile: "Plumber",
      description: "Inspection & testing electricians required across Manchester to start ASAP. Ongoing work.",
      trade: electricianTrade,
      rate: 23,
      hours: 8,
      startDate: "2019-05-10",
      company: companies[1],
      agency: agencies[1],
      worksite: worksites[1],
      favorites: [user],
      location: "Streatham, London",
    },
  ];

  return Job.create(jobs);
};
