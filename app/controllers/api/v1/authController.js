const jwt = require("jsonwebtoken");
const userService = require("../../../services/userService");
const bcrypt = require("bcrypt");
const axios = require("axios");

function createToken(user) {
  return jwt.sign(user, process.env.JWT_SIGNATURE_KEY || "team1", {
    expiresIn: "1h",
  });
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

      res.status(201).json({
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
        const tokenPayload = jwt.verify(
          token,
          process.env.JWT_SIGNATURE_KEY || "team1"
        );

        req.user = await userService.findById(tokenPayload.id);

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

  async google(req, res) {
    const { access_token } = req.body;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
      );
      const { sub, email, name } = response.data;

      let user = await userService.findByEmail(email);
      if (!user)
        user = await userService.create({
          nama: name,
          email,
          kota: null,
          alamat: null,
          noHp: null,
          gambar: null,
          googleId: sub,
          registeredVia: "google",
          idType: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      const user_data = JSON.parse(JSON.stringify(user));

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

      res.status(201).json({ token, user: user_data });
    } catch (err) {
      console.log(err.message);
      res.status(401).json({ error: { name: err.name, message: err.message } });
    }
  },
};
