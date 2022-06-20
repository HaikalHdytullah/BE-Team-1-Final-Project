const jwt = require("jsonwebtoken");
const userService = require("../../../services/userService");
const bcrypt = require("bcrypt");

function createToken(user) {
  return jwt.sign(user, process.env.JWT_SIGNATURE_KEY);
}

module.exports = {
  async login(req, res) {
    try {
      const email = req.body.email.toLowerCase();
      const password = req.body.password;

      const user = await userService.findByEmail(email);
      if (!user) {
        res.status(404).json({ message: "Email tidak ditemukan" });
        return;
      }

      const check = await bcrypt.compare(password, user.password);

      if (!check) {
        res.status(401).json({
          message: "Password tidak sesuai",
        });
        return;
      }

      // create token
      const token = createToken({
        id: user.id,
        nama: user.nama,
        email: user.email,
        kota: user.kota,
        alamat: user.alamat,
        noHp: user.noHp,
        gambar: user.gambar,
        googleId: user.googleId,
        registeredVia: user.registeredVia,
        idType: user.idType,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });

      const user_data = JSON.parse(JSON.stringify(user));
      delete user_data.password;

      res.status(201).json({
        user: user_data,
        token,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
        poses: process.env.JWT_SECRET_KEY,
      });
    }
  },
  // authorize user
  authorize:
    (...roles) =>
    async (req, res, next) => {
      try {
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split("Bearer ")[1];
        const tokenPayload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY);

        req.user = await userService.find(tokenPayload.id);

        if (roles.length > 0) {
          if (!roles.includes(req.user.idType)) {
            res.status(401).json({
              message: "Anda tidak punya akses (Unauthorized)",
            });
            return;
          }
        }

        next();
      } catch (error) {
        if (error.message.includes("jwt expired")) {
          res.status(401).json({ message: "Token Expired" });
          return;
        }

        res.status(401).json({
          message: "Unauthorized",
        });
      }
    },
};
