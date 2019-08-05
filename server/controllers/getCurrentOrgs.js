
const boom = require("boom");
const { getOrganizationById } = require("./../database/queries/organizations");

module.exports = async (req, res, next) => {
  const { user } = req;
  const {
    currentAgency, currentPayroll, currentCompany, currentWorksite,
  } = user;

  const currentOrgs = {};

  if (currentAgency) currentOrgs.agency = await getOrganizationById(currentAgency);
  if (currentPayroll) currentOrgs.payroll = await getOrganizationById(currentPayroll);
  if (currentCompany) currentOrgs.company = await getOrganizationById(currentCompany);
  if (currentWorksite) currentOrgs.worksite = await getOrganizationById(currentWorksite);

  //  const currentOrgs = { currentAgency, currentPayroll, currentCompany, currentWorksite }

  try {
    // send updated user back to client
    return res.json(currentOrgs);
  } catch (error) {
    return next(boom.badImplementation());
  }
};
