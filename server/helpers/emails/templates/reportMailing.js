const mailer = require("../mailer");
const config = require("../../../config");

module.exports = ({
  // user.userId
  reporterUserId,
  // user.email
  reporterEmail,
  // question.profileText
  questionText,
  // comment.text
  commentText,
  // comment.userId
  reportedUserId,
  // review.user.userId
  reportedReviewUserId,
  // review.overallReview.text
  reportedReviewText,
  // reply.user[0].userId
  reportedReplyUserId,
  // reply.text
  reportedReplyText,
  reason,
  description,
  target,
  orgId,
  orgName,
  image,
}) => {
  let html;
  if (target === "questionComment") {
    html = `
    <div style="text-align: center">
      <img src="cid:earwig-logo" style="background: white;"/>
      <div style="text-align: left; font-weight: 100; line-height: 30px;">
            <br />
          <p>
          <span style="font-weight: 700;">User ID:</span> ${reporterUserId}
          <br />

          <span style="font-weight: 700;">User email:</span> ${reporterEmail} 
          <br />

          <span style="display: inline-block; margin-top: 1rem;">Reported a comment on a question:</span>
          <br />

          <span style="font-weight: 700;">Question: </span> <span style="font-weight: 100; padding: 0 11px; border-radius: 10px; background: #ababab29; display: block">"${questionText}"</span>
          <br />

          <span style="font-weight: 700;">Comment owner:</span> ${reportedUserId}
          <br />

          <span style="font-weight: 700">Comment words: </span><span style="font-weight: 100; padding: 0 11px; border-radius: 10px; background: #ababab29; display: block">"${commentText}"</span>
          <br />

          <span style="font-weight: 700;">Organization:</span> <a href="${config.server.domain}/profile/${orgId}">${orgName}</a> 
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
        <span style="font-weight: 700">Review words: </span><span style="font-weight: 100; padding: 0 11px; border-radius: 10px; background: #ababab29; display: block">"${reportedReviewText}"</span>
        <br />
      `;
    }
    html = `
    <div style="text-align: center">
      <img src="cid:earwig-logo" style="background: white;"/>
      <div style="text-align: left; font-weight: 100; line-height: 30px;">
          <br />
        <p>
          <span style="font-weight: 700;">User ID:</span> ${reporterUserId}
          <br />

          <span style="font-weight: 700;">User Email:</span> ${reporterEmail} 
          <br />

          <span style="display: inline-block; margin-top: 1rem;">Reported ${overallReview ? "an overall" : "a voice"} review:</span>
          <br />

          <span style="font-weight: 700;">Review owner:</span> ${reportedReviewUserId}
          <br />
          ${overallReview}

          <span style="font-weight: 700;">Organization:</span> <a href="${config.server.domain}/profile/${orgId}">${orgName}</a> 
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
          <span style="font-weight: 700;">User ID:</span> ${reporterUserId}
          <br />

          <span style="font-weight: 700;">User Email:</span> ${reporterEmail} 
          <br />

          <span style="display: inline-block; margin-top: 1rem;">Reported a reply on an overall review:</span>
          <br />

          <span style="font-weight: 700;">Review owner:</span> ${reportedReviewUserId}
          <br />

          <span style="font-weight: 700">Review words: </span><pre style="font-weight: 100; padding: 0 11px; border-radius: 10px; background: #ababab29; display: block">"${reportedReviewText}"</pre>
          <br />

          <span style="font-weight: 700;">Reply owner:</span> ${reportedReplyUserId}
          <br />

          <span style="font-weight: 700">Reply words: </span><pre style="font-weight: 100; padding: 0 11px; border-radius: 10px; background: #ababab29; display: block">"${reportedReplyText}"</pre>
          <br />

          <span style="font-weight: 700;">Organization:</span> <a href="${config.server.domain}/profile/${orgId}">${orgName}</a> 
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
          <span style="font-weight: 700;">User ID:</span> ${reporterUserId}
          <br />

          <span style="font-weight: 700;">User Email:</span> ${reporterEmail} 
          <br />

          <span style="display: inline-block; margin-top: 1rem;">Reported a worksite image:</span>
          <br />

          <span style="font-weight: 700;">Review owner:</span> ${reportedReviewUserId}
          <br />

          <img src="${image}" style="background: white;"/>
          <br />

          <span style="font-weight: 700;">Organization:</span> <a href="${config.server.domain}/profile/${orgId}">${orgName}</a> 
          <br />

        </p>

        <span style="font-weight: 700;">Reason: </span><span>${reason}</span>
        <br />

        <span style="font-weight: 700;">Description: </span><pre style="display: block">${description}</pre>
      </div>
    </div> 
  `;
  }


  const { email } = config;

  const earwig = email.main;
  const pass = email.password;
  const from = email.aliases.reportSend;
  const subject = "Content reported on earwig";
  const to = email.aliases.reportRecive;

  const attachments = [{
    filename: "logo.png",
    path: `${__dirname}/../../../assets/logo.png`,
    cid: "earwig-logo",
  }];

  return mailer({
    from, to, subject, html, user: earwig, pass, attachments,
  });
};
