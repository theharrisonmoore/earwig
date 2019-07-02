const mailer = require("./mailer");

module.exports = (to) => {
  const domain = process.env.DOMAIN;
  const giveReviewLink = `${domain}/search?give-review=true`;
  const viewProfileLink = `${domain}/search`;

  const html = `
  <div style="text-align: center;">
    <img src="cid:earwig-logo" style="background: white;"/>
    <p style="font-weight: 700; font-size: 20px;">Thank you for getting verified as a worker</p>
      <div style="text-align: left;">
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

      <p>Or, why not <a href="${viewProfileLink}">read reviews and ratings</a> others have already given.</p>
      </br>
      </br>
      <p style="font-weight: 700;">Thanks for choosing to be part of the earwig worker community.</p>
      </br>
      </br>
      <p style="margin-bottom: 0;">Have a good day,</p>
      <p style="margin-bottom: 0;">Harrison</p>
      <p style="margin-bottom: 0;">Sparky and founder</p>
    </div>  
  </div>  
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = "Your verification has been successful";
  const from = process.env.EMAIL; // hello

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
