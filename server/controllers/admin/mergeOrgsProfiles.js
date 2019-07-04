const boom = require("boom");

const {
  transferReviews,
  transferComments,
  transferAnswers,
  deleteOrganisationById,
} = require("./../../database/queries/organizations/merge");

module.exports = async (req, res, next) => {
  try {
    const { toMergeProfileId, toMergeProfileIntoId } = req.query;
    if (!toMergeProfileId || !toMergeProfileIntoId) {
      return next(boom.badRequest());
    }


    const updateData = { oldOrg: toMergeProfileId, newOrg: toMergeProfileIntoId };

    const promises = [
      transferReviews(updateData),
      transferComments(updateData),
      transferAnswers(updateData),
      deleteOrganisationById(toMergeProfileId),
    ];

    await Promise.all(promises);
    return res.send();
  } catch (error) {
    return next(boom.badImplementation());
  }
};
