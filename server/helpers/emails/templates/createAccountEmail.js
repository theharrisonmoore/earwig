const mailer = require("../mailer");
const config = require("../../../config");

module.exports = to => {
  const html = `
  <div>
    <div style="text-align: center;" >
      <img src="cid:earwig-logo" style="background: white;text-align: center;" />
    </div>
    <h2 style="font-weight: 700;">Thank you for signing-up to earwig,</h2>

    <p>You can now <a href="${config.server.domain}/search" target="_blank" rel="noreferrer" rel="noopener"
        style="color: #8c6bfc; font-weight: 900;"> read
        reviews and ratings</a>&nbsp; workers have given about agencies, payrolls, worksites and construction
      companies.</p>
    <p>If you’re a worker, you should <a href="${config.server.domain}/upload-verification-photo"
    style="color: #8c6bfc; font-weight: 900;">get verified</a> so you can enjoy full access to the earwig
      platform, including:</p>

    <ul>
      <li> Giving reviews</li>
      <li>Earning points from other workers for helping them</li>
      <li>Asking and answering questions</li>
      <li>Inviting other workers to earwig</li>
      <li>Plus, other stuff you might find helpful</li>
    </ul>

    <p>Thanks for choosing to be part of the earwig worker community.</p>

    <p style="margin-bottom: 0;">Have a good day,</p>
    <p style="margin-bottom: 0;">Harrison</p>
    <p style="margin-bottom: 0;">Sparky and founder</p>
  </div>
`;

  const { email } = config;
  const user = email.main;
  const pass = email.password;
  const from = email.main;
  const subject = "You're now signed-up to earwig";

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
