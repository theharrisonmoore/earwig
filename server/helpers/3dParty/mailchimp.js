const axios = require("axios");

const addToMailchimp = email => new Promise(async (reslove, reject) => {
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
  // TODO: refactor this function
  try {
    const resp = await axios(options);
    const { errors } = resp.data;
    if (!errors.length) {
      return reslove("Successfully added");
    }
    return reject(errors[0]);
  } catch (error) {
    if (error.response.status === 400) {
      return reject(error);
    }
    return reject(error);
  }
});

module.exports = addToMailchimp;
