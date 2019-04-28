const mailer = require("./mailer");

module.exports = (to, id) => {
  const html = `
  <div style="text-align: center;">
    <img src="cid:earwig-logo" style="background: white;"/>
    <p style="font-weight: 700;">Welcome to the earwig community,</p>
    <p>We need you to confirm your email address so we know you’re reachable at this address. Your email address will always stay hidden on earwig.</p>
    
    <a href="${process.env.DOMAIN}/confirm-email/${id}" style="display: inline-block; padding: 1rem; background: #8c6bfc; color: white; font-size: 24px; font-weight: 900; border-radius: 10px; box-shadow: 0px 5px 11px 1px #9e9e9e7d; text-decoration: none;">Confirm my email address</a>
    <p>Or copy this link and paste it in your web browser.</p>

    <p style="font-weight: 700;">${process.env.DOMAIN}/confirm-email/${id}</p>

    <p>If you received this email by mistake, simply delete it.</p>

    <p style="margin-bottom: 0;">Thanks,</p>
    <p style="margin-bottom: 0;">earwig team</p>
  </div>  
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = "Welcome to the earwig community";
  const from = process.env.EMAIL;

  const attachments = [{
    filename: "logo.png",
    path: `${__dirname}/../assets/logo.png`,
    cid: "earwig-logo",
  }];

  return mailer({
    from, to, subject, html, user, pass, attachments,
  });
};
