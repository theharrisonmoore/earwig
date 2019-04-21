const { admin } = require("./../config");

module.exports = fileName => new Promise(async (resolve, reject) => {
  try {
    const bucket = admin.storage().bucket();

    const [exists] = await bucket
      .file(fileName)
      .exists();

    if (!exists) {
      throw new Error("file is no longer available");
    }

    await bucket
      .file(fileName)
      .delete();

    resolve();
  } catch (error) {
    reject(error);
  }
});
