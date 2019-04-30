const mailer = require("./mailer");

module.exports = ({
  reason, description, target, question, organization, review, user, comment,
}) => {
  let html;
  if (target === "questionComment") {
    html = `
    <div style="text-align: center">
      <img src="cid:earwig-logo" style="background: white;"/>
      <div style="text-align: left; font-weight: 100; line-height: 30px;">
            <br />
          <p>
          <span style="font-weight: 700;">User ID:</span> ${user.userId}
          <br />

          <span style="font-weight: 700;">User email:</span> ${user.email} 
          <br />

          <span style="display: inline-block; margin-top: 1rem;">Reported a comment on a question:</span>
          <br />

          <span style="font-weight: 700;">Question: </span> <span style="font-weight: 100; padding: 0 11px; border-radius: 1000px; background: #ababab29; display: inline-block">"${question.question.profileText}"</span>
          <br />

          <span style="font-weight: 700;">Comment owner:</span> ${comment.userId}
          <br />

          <span style="font-weight: 700">Comment words: </span><span style="font-weight: 100; padding: 0 11px; border-radius: 1000px; background: #ababab29; display: inline-block">"${comment.text}"</span>
          <br />

          <span style="font-weight: 700;">Organization:</span> <a href="${process.env.DOMAIN}/profile/${organization._id}">${organization.name}</a> 
          <br />

        </p>

        <span style="font-weight: 700;">Reason: </span><span>${reason}</span>
        <br />
        <span style="font-weight: 700;">Description: </span><span>${description}</span>
      </div> 
    </div> 
  `;
  } else if (target === "overallReview") {
    html = `
    <div style="text-align: center">
      <img src="cid:earwig-logo" style="background: white;"/>
      <div style="text-align: left; font-weight: 100; line-height: 30px;">
          <br />
        <p>
          <span style="font-weight: 700;">User ID:</span> ${user.userId}
          <br />

          <span style="font-weight: 700;">User Email:</span> ${user.email} 
          <br />

          <span style="display: inline-block; margin-top: 1rem;">Reported an overall review:</span>
          <br />

          <span style="font-weight: 700;">Review owner:</span> ${review.user.userId}
          <br />

          <span style="font-weight: 700">Review words: </span><span style="font-weight: 100; padding: 0 11px; border-radius: 1000px; background: #ababab29; display: inline-block">"${review.overallReview.text}"</span>
          <br />

          <span style="font-weight: 700;">Organization:</span> <a href="${process.env.DOMAIN}/profile/${organization._id}">${organization.name}</a> 
          <br />

        </p>

        <span style="font-weight: 700;">Reason: </span><span>${reason}</span>
        <br />

        <span style="font-weight: 700;">Description: </span><span>${description}</span>
      </div>
    </div> 
  `;
  }

  const earwig = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = "Welcome to the earwig community";
  const from = process.env.REPORT_EMAIL;
  const to = process.env.REPORT_RECEIVER_EMAIL;

  const attachments = [{
    filename: "logo.png",
    path: `${__dirname}/../assets/logo.png`,
    cid: "earwig-logo",
  }];

  return mailer({
    from, to, subject, html, user: earwig, pass, attachments,
  });
};