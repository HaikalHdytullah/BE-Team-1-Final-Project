const userService = require("../../../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { promisify } = require("util");
const cloudinary = require("../../../../utils/cloudinary");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);
const cloudinaryDestroy = promisify(cloudinary.uploader.destroy);

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
        googleId: null,
        registeredVia: "form",
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

  async updateProfile(req, res) {
    try {
      const { idUser, nama, kota, alamat, noHp } = req.body;
      let fotoProfile;
      let fileBase64;
      let file;

      const user = await userService.findById(idUser);
      const user_data = JSON.parse(JSON.stringify(user));
      if (user !== null) {
        if (req.file) {
          // Delete Image from Cloudinary
          if (user.gambar !== null) {
            let cloudImage = user_data.gambar.substring(62, 82);
            cloudinaryDestroy(cloudImage);
          }
          // Upload New Image to Cloudinary
          fileBase64 = req.file.buffer.toString("base64");
          file = `data:${req.file.mimetype};base64,${fileBase64}`;
          const resultImage = await cloudinaryUpload(file);
          fotoProfile = resultImage.secure_url;
          await userService.update(idUser, {
            nama,
            kota,
            alamat,
            noHp,
            gambar: fotoProfile,
          });
          let data = JSON.parse(JSON.stringify(user));
          delete data.password;
          return res.status(200).json({
            status: "OK",
            message: "Profile berhasil diperbarui",
            data,
          });
        }

        await userService.update(idUser, {
          nama,
          kota,
          alamat,
          noHp,
        });

        let data = JSON.parse(JSON.stringify(user));
        delete data.password;

        res.status(200).json({
          status: "OK",
          message: "Profile berhasil diperbarui",
          data,
        });
      }
      res.status(404).json({
        message: "User Not Found",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  async whoAmI(req, res) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(
        token,
        process.env.JWT_SIGNATURE_KEY || "team1"
      );

      const user = JSON.parse(
        JSON.stringify(await userService.findByEmail(tokenPayload.email))
      );
      delete user.password;

      res.json({ user });
    } catch (error) {
      if (error.message.includes("jwt expired")) {
        res.status(401).json({ message: "Token Expired" });
        return;
      }
      res.status(400).json({
        status: "FAIL",
        message: error.message,
      });
    }
  },

  async deleteAccount(req, res) {
    await userService.delete(req.params.email);

    res.status(200).json({
      status: "OK",
      message: "Akun berhasil dihapus",
    });
  },
};
