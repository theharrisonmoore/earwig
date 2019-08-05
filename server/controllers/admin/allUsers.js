/**
 * get all workers info
 * to be rendered in a table for the admin
 */

const boom = require("boom");

const { getAllUsers } = require("./../../database/queries/user");

module.exports = async (req, res, next) => {
  const awaitingReview = req.query.awaitingReview === "true";

  try {
    const users = await getAllUsers(awaitingReview);
    res.json(users);
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
