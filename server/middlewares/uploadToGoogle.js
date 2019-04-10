
const admin = require("firebase-admin");
const { cred, storageBucket } = require("../config");

admin.initializeApp({
  credential: admin.credential.cert(cred),
  storageBucket,
});

module.exports = (bucketName, filename) => async (req, res, next) => {
  console.log(11111);

  // [START storage_upload_file]
  // Imports the Google Cloud client library
  // const { Storage } = require("@google-cloud/storage");

  // Creates a client
  // const storage = new Storage();
  const bucket = admin.storage().bucket();
  /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
  // const bucketName = 'Name of a bucket, e.g. my-bucket';
  // const filename = 'Local file to upload, e.g. ./local/path/to/file.txt';

  // Uploads a local file to the bucket
  await bucket.upload("./uploads/98df52f08f4308eec65416b2908169c2", {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: "public, max-age=31536000",
    },
  });

  console.log(`${filename} uploaded to ${bucketName}.`);
  // [END storage_upload_file]
  next();
};
