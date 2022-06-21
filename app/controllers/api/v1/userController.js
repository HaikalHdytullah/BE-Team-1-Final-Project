const userService = require("../../../services/userService");
const bcrypt = require("bcrypt");

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
      const { id, nama, kota, alamat, noHp } = req.body;
      let fotoProfile = "";
      let fileBase64 = "";
      let file = "";

      const user = await userService.findById(id);
      const user_data = JSON.parse(JSON.stringify(user));

      // Delete Image from Cloudinary
      console.log(user_data.gambar.substring(62, 82));
      let cloudImage = user_data.gambar.substring(62, 82);
      if (user.gambar !== "") {
        cloudinaryDestroy(cloudImage);
      }

      // Upload New Image to Cloudinary
      fileBase64 = req.file.buffer.toString("base64");
      file = `data:${req.file.mimetype};base64,${fileBase64}`;
      const resultImage = await cloudinaryUpload(file);
      fotoProfile = resultImage.secure_url;

      await userService.update(id, {
        nama,
        kota,
        alamat,
        noHp,
        gambar: fotoProfile,
      });

      res.status(200).json({
        status: "OK",
        message: "Profile berhasil diperbarui",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
};
