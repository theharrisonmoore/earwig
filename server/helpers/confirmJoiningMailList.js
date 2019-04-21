

const mailer = require("./mailer");

module.exports = (to) => {
  const html = `
  <div style="text-align: center;">
    [earwig logo]
    <p style="font-weight: 700;">Welcome to the earwig community,</p>
    <p>We need you to confirm your email address so we know you’re reachable at this address. Your email address will always stay hidden on earwig.</p>
    [button]
    <p>Or copy this link and paste it in your web browser.</p>
    [link]
    <p>If you received this email by mistake, simply delete it.</p>

    <p>Thanks,</p>
    <p>earwig team</p>
  </div>  
`;
  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = "Welcome to the earwig community";
  const from = process.env.EMAIL;

  return mailer({
    from, to, subject, html, user, pass,
  });
};
