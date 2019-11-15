const addToMailchimp = (email) => {
  // eslint-disable-next-line global-require
  const axios = require("axios");
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
      },
    ],
    update_existing: true,
  };

  const options = {
    url: process.env.MAILCHIMP_LIST_URL,
    method: "POST",
    headers: {
      Authorization: `apikey ${process.env.MAILCHIMP_LIST_APIKEY}`,
    },
    data,
  };
  return axios(options);
};

module.exports = addToMailchimp;
