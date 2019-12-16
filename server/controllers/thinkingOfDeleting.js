const boom = require("boom");

const { isProduction } = require("../helpers/checkEnv");
const sendEmail = require("../helpers/emails");

module.exports = async (req, res, next) => {
  try {
    const { user } = req;
    const { message } = req.body;

    if (isProduction()) {
      await sendEmail.thinkOfAccountDeletingEmail({ message, user });
    }

    return res.json({ message: "Completed" });
  } catch (err) {
    next(boom.badImplementation(err));
  }
};
