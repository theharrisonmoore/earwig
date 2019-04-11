const privateKey = process.env.private_key
  .replace(new RegExp("\\\\n", "g"), "\n")
  .replace("\"", "");


module.exports.cred = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: privateKey,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
};

module.exports.storageBucket = process.env.storageBucket;
