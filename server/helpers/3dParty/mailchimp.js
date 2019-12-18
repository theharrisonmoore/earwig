const config = require("../../config");

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
    url: config.thirdParty.mailChimp.listUrl,
    method: "POST",
    headers: {
      Authorization: `apikey ${config.thirdParty.mailChimp.apiKey}`,
    },
    data,
  };
  return axios(options);
};

module.exports = addToMailchimp;
