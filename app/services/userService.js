const userRepository = require("../repositories/userRepository");

module.exports = {
  async findByEmail(email) {
    return userRepository.findByEmail(email);
  },
  async findById(id) {
    return userRepository.findById(id);
  },
  async create(data) {
    return userRepository.create(data);
  },
  async update(id, updateArgs) {
    return userRepository.update(id, updateArgs);
  },
};
