/* eslint-disable global-require */

const addToMailchimp = email => new Promise(async (reslove, reject) => {
  const axios = require("axios");
  const boom = require("boom");
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        update_existing: true,
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
    return reject(boom.badData(errors));
  } catch (error) {
    if (error.response.status === 400) {
      return reject(boom.badRequest(error));
    }
    return reject(boom.badImplementation(error));
  }
});


module.exports = addToMailchimp;
