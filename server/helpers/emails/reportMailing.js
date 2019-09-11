const mailer = require("./mailer");

module.exports = ({
  reason, description, target, question, organization, review, user, comment, reply, image,
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

          <span style="font-weight: 700;">Question: </span> <span style="font-weight: 100; padding: 0 11px; border-radius: 10px; background: #ababab29; display: block">"${question.profileText}"</span>
          <br />

          <span style="font-weight: 700;">Comment owner:</span> ${comment.userId}
          <br />

          <span style="font-weight: 700">Comment words: </span><span style="font-weight: 100; padding: 0 11px; border-radius: 10px; background: #ababab29; display: block">"${comment.text}"</span>
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
  } else if (target === "overallReview" || target === "voiceReview") {
    let overallReview = "";
    if (target === "overallReview") {
      overallReview = `
        <span style="font-weight: 700">Review words: </span><span style="font-weight: 100; padding: 0 11px; border-radius: 10px; background: #ababab29; display: block">"${review.overallReview.text}"</span>
        <br />
      `;
    }
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

          <span style="display: inline-block; margin-top: 1rem;">Reported ${overallReview ? "an overall" : "a voice"} review:</span>
          <br />

          <span style="font-weight: 700;">Review owner:</span> ${review.user.userId}
          <br />
          ${overallReview}

          <span style="font-weight: 700;">Organization:</span> <a href="${process.env.DOMAIN}/profile/${organization._id}">${organization.name}</a> 
          <br />

        </p>

        <span style="font-weight: 700;">Reason: </span><span>${reason}</span>
        <br />

        <span style="font-weight: 700;">Description: </span><span>${description}</span>
      </div>
    </div> 
  `;
  } else if (target === "overallReply") {
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

          <span style="display: inline-block; margin-top: 1rem;">Reported a reply on an overall review:</span>
          <br />

          <span style="font-weight: 700;">Review owner:</span> ${review.user.userId}
          <br />

          <span style="font-weight: 700">Review words: </span><pre style="font-weight: 100; padding: 0 11px; border-radius: 10px; background: #ababab29; display: block">"${review.overallReview.text}"</pre>
          <br />

          <span style="font-weight: 700;">Reply owner:</span> ${reply.user[0].userId}
          <br />

          <span style="font-weight: 700">Reply words: </span><pre style="font-weight: 100; padding: 0 11px; border-radius: 10px; background: #ababab29; display: block">"${reply.text}"</pre>
          <br />

          <span style="font-weight: 700;">Organization:</span> <a href="${process.env.DOMAIN}/profile/${organization._id}">${organization.name}</a> 
          <br />

        </p>

        <span style="font-weight: 700;">Reason: </span><span>${reason}</span>
        <br />

        <span style="font-weight: 700;">Description: </span><pre style="display: block">${description}</pre>
      </div>
    </div> 
  `;
  } else if (target === "worksiteImage") {
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

          <span style="display: inline-block; margin-top: 1rem;">Reported a worksite image:</span>
          <br />

          <span style="font-weight: 700;">Review owner:</span> ${review.user.userId}
          <br />

          <img src="${image}" style="background: white;"/>
          <br />

          <span style="font-weight: 700;">Organization:</span> <a href="${process.env.DOMAIN}/profile/${organization._id}">${organization.name}</a> 
          <br />

        </p>

        <span style="font-weight: 700;">Reason: </span><span>${reason}</span>
        <br />

        <span style="font-weight: 700;">Description: </span><pre style="display: block">${description}</pre>
      </div>
    </div> 
  `;
  }

  const earwig = process.env.EMAIL;
  const pass = process.env.EMAIL_PASSWORD;
  const subject = "Content reported on earwig";

  const from = process.env.REPORT_EMAIL;
  const to = process.env.REPORT_RECEIVER_EMAIL;

  const attachments = [{
    filename: "logo.png",
    path: `${__dirname}/../../assets/logo.png`,
    cid: "earwig-logo",
  }];

  return mailer({
    from, to, subject, html, user: earwig, pass, attachments,
  });
};
