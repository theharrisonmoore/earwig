const boom = require("boom");

const mailer = require("./../helpers/mailer");

module.exports = async (req, res, next) => {
  const { user } = req;

  const { message } = req.body;

  const html = `<div style="text-align: center;">
  <p style="font-weight: 700;">Hi Harrison,</p>
  <p>A user has sent a message saying they are thinking of deleting their account. Here is their message:</p>
  
  <p>${message}</p>

  <p>Here is their user information</p>
  <ul>
    <li>Email: ${user.email}</li>
    <li>Verified: ${user.verified}</li>
    <li>Points: ${user.points}</li>
  </ul>

  <p style="margin-bottom: 0;">Thanks,</p>
  <p style="margin-bottom: 0;">The earwig Bot</p>
</div>  `;

  const to = "joseph.s.friel@gmail.com";
  const adminUser = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = "WARNING! User thinking of deleting account";
  const from = process.env.EMAIL;

  await mailer({
    from,
    to,
    subject,
    html,
    adminUser,
    pass,
  }).catch(err => next(boom.badImplementation(err)));

  return res.json({ message: "sent" });
};
