const mailer = require("./mailer");

module.exports = (to, link) => {
  const html = `
  <div style="text-align: center;">
    <img src="cid:earwig-logo" style="background: white;"/>
    <p style="font-weight: 700;">Reset Your Password</p>
    <p>Use the link below to set your new password on earwig.</p>
    <p>This link is valid for one hour and will expire automatically after that.</p>
    
    <a href="${link}" style="display: inline-block; padding: 0.5rem 1rem; background: #8c6bfc; color: white; font-size: 20px; font-weight: 900; border-radius: 10px; box-shadow: 0px 5px 11px 1px #9e9e9e7d; text-decoration: none;">Reset your password</a>
    <p>Or copy this link and paste it in your web browser.</p>

    <p style="font-weight: 700;">${link}</p>

    <p>If you received this email by mistake, simply delete it.</p>

    <p style="margin-bottom: 0;">Thanks,</p>
    <p style="margin-bottom: 0;">earwig team</p>
  </div>  
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = "Reset Your Password";
  const from = process.env.EMAIL;

  const attachments = [
    {
      filename: "logo.png",
      path: `${__dirname}/../assets/logo.png`,
      cid: "earwig-logo",
    },
  ];

  return mailer({
    from,
    to,
    subject,
    html,
    user,
    pass,
    attachments,
  });
};
