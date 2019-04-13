const boom = require("boom");

const { getQuetionsByOrg } = require("../database/queries/review");

const getByOrg = (req, res, next) => {
  const { organization } = req.query;

  getQuetionsByOrg(organization)
    .then((groups) => {
      res.json(groups);
    })
    .catch(() => {
      next(boom.badImplementation());
    });
};

const postReview = (req, res, next) => {
  const { questions } = req.body;
  console.log(questions);
};


module.exports = { getByOrg, postReview };
