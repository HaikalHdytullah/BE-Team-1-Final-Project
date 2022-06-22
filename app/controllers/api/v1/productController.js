const productService = require("../../../services/productServices");
const { promisify } = require("util");
const cloudinary = require("../../../../utils/cloudinary");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);
const cloudinaryDestroy = promisify(cloudinary.uploader.destroy);

module.exports = {
  // list all products
  async listAll(req, res) {
    try {
      const product = await productService.list();
      // console.log(product)
      if (product.totalBarang === 0) {
        res.status(404).json({
          message: "Product is Empty",
        });
        return;
      }
      res.status(200).json({
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  // add product
  async addProduct(req, res) {
    try {
      let fotoProduk = [];
      let fileBase64 = [];
      let file = [];
      const product = {
        idUser: req.body.idUser,
        nama: req.body.nama,
        harga: req.body.harga,
        kategori: req.body.kategori,
        deskripsi: req.body.deskripsi,
        minat: false,
      };
      const product_data = await productService.addProduct(product);

      for (var i = 0; i < req.files.length; i++) {
        fileBase64.push(req.files[i].buffer.toString("base64"));
        file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
        const result = await cloudinaryUpload(file[i]);
        fotoProduk.push(result.secure_url);
        await productService.addProductPic({
          idProduct: product_data.id,
          gambar: fotoProduk[i],
        });
      }

      res.status(200).json({
        message: "tambah produk berhasil",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
