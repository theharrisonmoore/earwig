const nodemailer = require("nodemailer");

module.exports = ({ from, to, subject, html, user, pass, attachments }) => {
  const transporter = nodemailer.createTransport({
    service: "Office365",
    host: "smtp.office365.com",
    secureConnection: true,
    port: 25, // secure SMTP
    // secure: false, // false for TLS - as a boolean not string -
    //                     but the default is false so just remove this completely
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  if (!(process.env.NODE_ENV === "production" && user.role !== "admin")) {
    // eslint-disable-next-line no-console
    console.log("email suppose to be sent");
    return Promise.resolve();
  }
  return transporter.sendMail({
    from, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
    attachments,
  });
};
