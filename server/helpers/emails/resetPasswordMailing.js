const mailer = require("./mailer");

module.exports = (to, token, userId) => {
  const domain = process.env.DOMAIN;
  const link = `${domain}/reset-password/set/${token}`;

  const html = `
  <div style="text-align: center;">
    <img src="cid:earwig-logo" style="background: white;"/>
      <div style="text-align: left;">
      <p style="font-weight: 700;">Hi ${userId}</p>
      <p>We got a request to reset your earwig account password.</p>
      <p>To reset your password, click the link below or paste the following URL into your
      browser. If you did not ask to reset your password, please let us know and ignore this
      email.</p>
      
      <div style="text-align: center;">
        <a href="${link}" style="display: inline-block; padding: 0.5rem 1rem; background: #8c6bfc; color: white; font-size: 20px; font-weight: 900; border-radius: 10px; box-shadow: 0px 5px 11px 1px #9e9e9e7d; text-decoration: none;">Reset your password</a>
      </div>  

      <p style="font-weight: 700;">${link}</p>

      <p style="margin-bottom: 0;">Thanks,</p>
      <p style="margin-bottom: 0;">earwig team</p>
    </div>  
  </div>  
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = "Reset Your Password";
  const from = process.env.EMAIL;

  const attachments = [
    {
      filename: "logo.png",
      path: `${__dirname}/../../assets/logo.png`,
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
