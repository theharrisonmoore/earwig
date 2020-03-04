const mailer = require("../mailer");
const config = require("../../../config");

module.exports = to => {
  const html = `
  <div>
    <div style="text-align: center;" >
      <img src="cid:earwig-logo" style="background: white;text-align: center;" />
    </div>
    <h2 style="font-weight: 700;">Thank you for joining earwig,</h2>

    <p>You can 
      <a href="${config.server.domain}/" target="_blank" rel="noreferrer" rel="noopener" style="color: #8c6bfc; font-weight: 900;">
        read what workers have said 
      </a>
      &nbsp;
      about agencies, payrolls, worksites and construction companies. You can also:
    </p>

    <ul>
      <li>Give reviews</li>
      <li>Reply to workers</li>
      <li>Invite workers to earwig</li>
      <li>Find other helpful stuff</li>
    </ul>

    <p>
      Give a review (or two) about your working conditions every four weeks so other workers can choose the best jobs and avoid the worst.
    </p>

    <p style="margin-bottom: 0;">Have a good day,</p>
    <p style="margin-bottom: 0;">Harrison</p>
    <p style="margin-bottom: 0;">Sparky and founder</p>
  </div>
`;

  const { email } = config;
  const user = email.main;
  const pass = email.password;
  const from = email.main;
  const subject = "Nice one! You’re now part of the earwig community";

  const attachments = [
    {
      filename: "logo.png",
      path: `${__dirname}/../../../assets/logo.png`,
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
