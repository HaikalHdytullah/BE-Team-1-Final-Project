const { users } = require("../models");

module.exports = {
  findByEmail(email) {
    return users.findOne({
      where: {
        email,
      },
    });
  },
  findById(id) {
    return users.findOne({
      where: {
        id,
      },
    });
  },
  create(data) {
    return users.create(data);
  },
  update(id, updateArgs) {
    return users.update(updateArgs, {
      where: {
        id,
      },
    });
  },
};
