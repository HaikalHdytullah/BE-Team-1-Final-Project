const { users } = require("../models");

module.exports = {
  findByEmail(email) {
    return users.findOne({
      where: {
        email,
      },
    });
  },
  create(data) {
    return users.create(data);
  },
};
