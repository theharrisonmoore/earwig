const mailer = require("./mailer");

module.exports = (userDetails, orgInfo) => {
  const html = `
  <div style="text-align: center;">
    <img src="cid:earwig-logo" style="background: white;"/>
    <p style="font-weight: 700;">New profile added to eariwg</p>
    <p><span style="font-weight: 700;">${userDetails.userId}</span> added <span style="font-weight: 700;">${orgInfo.name}</span> as ${orgInfo.category}</p>
    
    <a href="${
  process.env.DOMAIN
}/profile/${orgInfo._id}" style="display: inline-block; padding: 0.5rem 1rem; background: #8c6bfc; color: white; font-size: 20px; font-weight: 900; border-radius: 10px; box-shadow: 0px 5px 11px 1px #9e9e9e7d; text-decoration: none;">view ${orgInfo.name} profile</a>

  </div>
`;

  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = "New profile added to eariwg";
  const from = "process.env.EMAIL";
  const to = process.env.PROFILE_EMAIL;

  const attachments = [
    {
      filename: "logo.png",
      path: `${__dirname}/../assets/../logo.png`,
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
