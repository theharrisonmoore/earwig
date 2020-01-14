const mailer = require("../mailer");
const config = require("../../../config");

module.exports = to => {
  const { domain } = config.server;
  const giveReviewLink = `${domain}/search/review`;
  // const viewProfileLink = `${domain}/search/profile`;
  const introLink = `${domain}/intro`;
  const welcomeLink = `${domain}/`;

  const html = `
  <div style="text-align: center;">
    <img src="cid:earwig-logo" style="background: white;"/>
    <p style="font-weight: 700; font-size: 20px;">Thank you for getting verified as a worker</p>
      <div style="text-align: left;">
      <p>If you haven’t already, you should watch this <a href="${introLink}">important video</a>.</p>
      <p>You can now enjoy full access to the earwig platform, including:</p>
      <ul style="marrgin-bottom: 1rem; padding-left: 1rem;">
        <li>Giving reviews</li>
        <li>Replying to other workers’ reviews and comments</li>
        <li>Earning points from other workers for helping them</li>
        <li>Asking and answering questions</li>
        <li>Inviting other workers to earwig</li>
        <li>Searching jobs</li>
        <li>Plus, other stuff you might find helpful</li>
      </ul>

      <p>When you give a review, you help to create awareness, improve working conditions and help other workers feel more secure. Get started and give a review now!</p>


      <div style="text-align: center;">
        <a href="${giveReviewLink}" style="display: inline-block; padding: 0.5rem 1rem; background: #8c6bfc; color: white; font-size: 20px; font-weight: 900; border-radius: 10px; box-shadow: 0px 5px 11px 1px #9e9e9e7d; text-decoration: none;">Give a review</a>
      </div>

      <p>Or, why not <a href="${welcomeLink}">read reviews and ratings</a> others have already given.</p>
      </br>
      <p style="font-weight: 700;">Thanks for choosing to be part of the earwig worker community.</p>
      </br>
      <p style="margin-bottom: 0;">Have a good day,</p>
      <p style="margin-bottom: 0;">Harrison</p>
      <p style="margin-bottom: 0;">Sparky and founder</p>
    </div>
  </div>
`;

  const { email } = config;
  const user = email.main;
  const pass = email.password;
  const from = email.main;
  const subject = "Your verification has been successful";

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
