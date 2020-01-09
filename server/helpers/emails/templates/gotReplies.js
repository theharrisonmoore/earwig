
const mailer = require("../mailer");
const config = require("../../../config");

module.exports = ({ orgId, recipientEmail }) => {
  const html = `
  <div style="text-align: left;">
    <p style="font-weight: 700;">
      Hey, a worker just replied to your review on earwig!
    </p>
    <p>
      <a href="${config.server.domain}/profile/${orgId}" target="_blank" rel="noreferrer" rel="noopener"
      style="color: #8c6bfc; font-weight: 900;">
      Go to your review
      </a>
    </p>

    <p>
      By the way, we know getting too many emails can be annoying. 
      But please bear with us, we don't have an app yet so we can only use email to tell you about important developments. 
      We're working as hard as we can to build an app so we don't have to send emails. 
      We'll let you know (by email ;) ) when we've done it.     
    </p>

    <p style="margin-bottom: 0;">Thanks for your patience,</p>
    <p style="margin-bottom: 0;">Team earwig</p>

  </div>`;

  const { email } = config;

  const adminUser = email.main;
  const pass = email.password;
  const from = email.main;
  const to = recipientEmail;
  const subject = "A worker just replied to your review on earwig";

  return mailer({
    from,
    to,
    subject,
    html,
    user: adminUser,
    pass,
  });
};
