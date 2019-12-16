const mailer = require("../mailer");
const config = require("../../../config");

module.exports = (to) => {
  const link = `${config.server.domain}/upload-verification-photo`;

  const html = `
  <div style="text-align: center;">
    <img src="cid:earwig-logo" style="background: white;"/>
      <p style="font-weight: 700; font-size: 20px;">We couldn’t verify you using the photo you uploaded</p>
    <div style="text-align: left;">
      <p>Maybe the photo was blurred or contained glare? Or maybe there was a technical glitch? If so, I’m really sorry about this. Give it another go!</p>
      
      <div style="text-align: center;">
        <a href="${link}" style="display: inline-block; padding: 0.5rem 1rem; background: #8c6bfc; color: white; font-size: 20px; font-weight: 900; border-radius: 10px; box-shadow: 0px 5px 11px 1px #9e9e9e7d; text-decoration: none;">Upload a new photo</a>
      </div>  

      <p style="font-weight: 700;">Thanks for choosing to be part of the earwig worker community.</p>
      </br>
      <p style="margin-bottom: 0;">Have a good day,</p>
      <p style="margin-bottom: 0;">Harrison</p>
      <p style="margin-bottom: 0;">Sparky and founder</p>
    </div>  
  </div>  
`;


  const { email } = config.email;
  const user = email.main;
  const pass = email.password;
  const from = email.main;
  const subject = "Your verification has been unsuccessful";

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
