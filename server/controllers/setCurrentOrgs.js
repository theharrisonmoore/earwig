/**
 * set contoller
 * allow the user to update current organizations they work for
 *
 * @param {currentAgency} -string- org ID
 * @param {currentPayroll} -string- org ID
 * @param {currentWorksite} -string- org ID
 * @param {currentCompany} -string- org ID
 *
 */

const boom = require("boom");
const { updateUserById, deleteUserFields } = require("./../database/queries/user");

module.exports = async (req, res, next) => {
  const {
    currentAgency, currentPayroll, currentWorksite, currentCompany,
  } = req.body;
  const { user } = req;

  console.log("user", user.id);

  console.log("req.body", req.body);

  const updateData = {
    currentAgency, currentPayroll, currentWorksite, currentCompany,
  };

  try {
    //  first clear the currentOrg fields
    await deleteUserFields(user.id, {
      currentAgency: "", currentPayroll: "", currentWorksite: "", currentCompany: "",
    });

    // set the new current Orgs
    const updatedUser = await updateUserById(user.id, updateData);

    // send updated user back to client
    return res.json(updatedUser);
  } catch (error) {
    next(boom.badImplementation());
  }
};
