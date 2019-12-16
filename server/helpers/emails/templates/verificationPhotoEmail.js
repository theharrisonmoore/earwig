const mailer = require("../mailer");
const config = require("../../../config");

const verificationPhotoEmail = () => {
  const html = `
  <div>
    <p style="font-weight: 700;">Dear earwig Admin,</p>
    <p>A user has uploaded a photo for verification and needs your approval.</p>
    
    <a href="${config.server.domain}" style="color: #8c6bfc">earwig link</a>
  </div>
`;

  const { email } = config.email;
  const user = email.main;
  const pass = email.password;
  const subject = "A user has uploaded a photo for verification";
  const from = email.main;
  const to = email.aliases.profile;

  return mailer({
    from,
    to,
    subject,
    html,
    user,
    pass,
  });
};

module.exports = verificationPhotoEmail;
