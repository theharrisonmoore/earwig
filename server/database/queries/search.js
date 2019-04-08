const User = require("../models/User");

module.exports = async () => {
  const user = await User.findById("5cab611b7f571a0a7293dfe3");
  console.log(user);
  return user;
};

// module.exports = input => new Promise((resolve, reject) => {
//   Organization.aggregate([
//     {
//       $match: {
//         name: input,
//       },
//     },
//   ])
//     .then(resolve)
//     .catch(reject);
// });
