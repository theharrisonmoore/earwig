const { admin } = require("./../config");

module.exports = fileName => new Promise(async (resolve, reject) => {
  // These options will allow temporary read access to the file
  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  };
  try {
    const bucket = admin.storage().bucket();

    // Get a v4 signed URL for reading the file
    const [url] = await bucket
      .file(fileName)
      .getSignedUrl(options);

    return resolve(url);
  } catch (error) {
    return reject(error);
  }

  // [END storage_generate_signed_url_v4]
});
