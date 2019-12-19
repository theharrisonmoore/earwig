const { admin } = require("../services/firebase");

module.exports = fileName => new Promise(async (resolve, reject) => {
  // These options will allow temporary read access to the file
  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + 60 * 60 * 1000, // 1 hour
  };
  try {
    const bucket = admin.storage().bucket();

    // Get a v4 signed URL for reading the file
    const [url] = await bucket.file(fileName).getSignedUrl(options);

    return resolve(url);
  } catch (error) {
    return reject(error);
  }
});
