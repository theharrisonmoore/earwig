const boom = require("boom");

const sendEmail = require("../helpers/emails");
const { isProduction } = require("../helpers/checkEnv");


module.exports = async (req, res, next) => {
  try {
    const { user } = req;
    const { message, page } = req.body;

    if (isProduction()) {
      await sendEmail.feedbackEmail({ page, message, user });
    }

    return res.json({ message: "Message sent" });
  } catch (err) {
    next(boom.badImplementation(err));
  }
};
