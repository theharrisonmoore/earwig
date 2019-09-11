const mailer = require("./mailer");

const emailAdminNewProfile = (userDetails, orgInfo) => {
  const html = `
  <div>
    <p style="font-weight: 700;">Dear earwig Admin,</p>
    <p>A user has just created a new entity profile.</p>
    
    <a href="${process.env.DOMAIN}/profile/${orgInfo._id}" style="color: #8c6bfc">view ${orgInfo.name} profile</a>

  </div>
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = "A new entity profile has been added to eariwg";
  const from = process.env.EMAIL;
  const to = process.env.PROFILE_EMAIL;

  return mailer({
    from,
    to,
    subject,
    html,
    user,
    pass,
  });
};

module.exports = emailAdminNewProfile;
