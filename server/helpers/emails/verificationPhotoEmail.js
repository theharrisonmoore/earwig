const mailer = require("./mailer");

const verificationPhotoEmail = () => {
  const html = `
  <div>
    <p style="font-weight: 700;">Dear earwig Admin,</p>
    <p>A user has uploaded a photo for verification and needs your approval.</p>
    
    <a href="${process.env.DOMAIN}" style="color: #8c6bfc">earwig link</a>
  </div>
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = "A user has uploaded a photo for verification";
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

module.exports = verificationPhotoEmail;
