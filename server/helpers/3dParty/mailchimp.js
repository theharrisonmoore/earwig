/* eslint-disable global-require */

const addToMailchimp = email => new Promise(async (reslove, reject) => {
  const axios = require("axios");
  const boom = require("boom");
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
      },
    ],
  };

  const options = {
    url: process.env.MAILCHIMP_LIST_URL,
    method: "POST",
    headers: {
      Authorization: `apikey ${process.env.MAILCHIMP_LIST_APIKEY}`,
    },
    data,
  };

  try {
    const resp = await axios(options);
    const { errors } = resp.data;
    if (!errors.length) {
      return reslove("Successfully added");
    }
    return reject(boom.badData());
  } catch (error) {
    if (error.response.status === 400) {
      return reject(boom.badRequest("Invalid Resource"));
    }
    return reject(boom.badImplementation());
  }
});

module.exports = addToMailchimp;
