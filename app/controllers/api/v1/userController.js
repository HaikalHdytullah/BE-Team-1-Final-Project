const userService = require("../../../services/userService");
const bcrypt = require("bcrypt");

module.exports = {
  async register(req, res) {
    try {
      const email = req.body.email.toLowerCase();
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = await userService.findByEmail(email);
      if (user) {
        res.status(400).json({ message: "Email already exists" });
        return;
      }

      const newUser = await userService.create({
        nama: req.body.nama,
        email,
        password: hashedPassword,
        kota: null,
        alamat: null,
        noHp: null,
        gambar: null,
        idType: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const user_data = JSON.parse(JSON.stringify(newUser));

      delete user_data.password;

      res.status(201).json({
        user: user_data,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },
};
