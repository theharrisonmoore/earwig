const mailer = require("../mailer");
const config = require("../../../config");

const newEntityAdded = (userDetails, orgInfo) => {
  const html = `
  <div>
    <p style="font-weight: 700;">Dear earwig Admin,</p>
    <p>A user has just created a new entity profile.</p>
    
    <a href="${config.server.domain}/profile/${orgInfo._id}" style="color: #8c6bfc">view ${orgInfo.name} profile</a>

  </div>
`;

  const { email } = config.email;
  const user = email.main;
  const pass = email.password;
  const from = email.main;
  const to = email.aliases.profile;
  const subject = "A new entity profile has been added to eariwg";


  return mailer({
    from,
    to,
    subject,
    html,
    user,
    pass,
  });
};

module.exports = newEntityAdded;
