const { admin } = require("./../config");

module.exports = fileName => new Promise(async (resolve, reject) => {
  try {
    const bucket = admin.storage().bucket();
    await bucket
      .file(fileName)
      .delete();

    resolve();
  } catch (error) {
    reject(error);
  }
});
