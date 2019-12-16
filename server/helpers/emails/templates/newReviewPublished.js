const mailer = require("../mailer");
const config = require("../../../config");

const newReviewPublished = (userDetails, orgInfo) => {
  const html = `
  <div>
    <p style="font-weight: 700;">Dear earwig Admin,</p>

    <p>A user has just published a new review</p>

    <p> <strong>Username: </strong> ${userDetails.userId}</p>
    <p> <strong>Entity name: </strong> ${orgInfo.name}</p>
    <p> <strong>Entity type: </strong> ${orgInfo.category}</p>

  </div>
`;

  const { email } = config;
  const user = email.main;
  const pass = email.password;
  const from = email.main;
  const to = email.main;

  const subject = "New review on earwig!";


  return mailer({
    from,
    to,
    subject,
    html,
    user,
    pass,
  });
};

module.exports = newReviewPublished;
