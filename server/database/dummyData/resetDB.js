const User = require("./../models/User");


const resetDB = async () => User.deleteMany();

module.exports = resetDB;
