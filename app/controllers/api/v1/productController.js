const productService = require("../../../services/productService");
const uploadOnMemory = require("../../../utils/uploadOnMemory");
const cloudinary = require("../../../utils/cloudinary");

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
      const product = {
        iduser: req.user.id,
        idkategori: req.body.kategori,
        nama: req.body.nama,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
      };
      const addProduct = await productService.addProduct(product);
      const upload = await cloudinary.uploader.upload(
        localUrl,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).json({
              message: err.message,
            });
            return;
          }
          productService.addImageProduct({
            idProduct: addProduct.id,
            gambar: result.secure_url,
          });
        }
      );
      res.status(201).json({
        message: "New Product Added",
        product: addProduct,
      });

      var urls = [];
      for (var i = 0; i < req.files.length; i++) {
        var localUrl = req.files[i].buffer.toString("base64");
        console.log(localUrl);
        var result = await upload(localUrl);
        urls.push(result.url);
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
