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

  async getProductsByMinatAndSeller(req, res) {
    try {
      if (req.query.minat === "t") {
        try {
          const data = await productService.findByMinat(
            req.query.idUser,
            req.query.minat
          );
          console.log(!data);
          if (data === []) {
            res.status(404).json({
              message: "Data produk kosong",
            });
          }
          res.status(200).json({
            data,
          });
        } catch (error) {
          res.status(500).json({
            error: error.message,
          });
        }
      } else {
        try {
          const data = await productService.findByUser(req.query.idUser);
          res.status(200).json({
            data,
          });
        } catch (error) {
          res.status(500).json({
            error: error.message,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  async getProductById(req, res) {
    try {
      const product = await productService.findById(req.query.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  async getProductByKategory(req, res) {
    try {
      const product = await productService.findByKategory(req.query.kategori);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },

  async getProductByName(req, res) {
    try {
      const nama = req.query.nama.toLowerCase();
      const product = await productService.findByName(nama);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
      console.log(error);
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

      const response_data = await productService.findById(product_data.id);

      res.status(200).json({
        message: "tambah produk berhasil",
        product: response_data,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  // update product
  async updateProduct(req, res) {
    try {
      let fotoProduk = [];
      let fileBase64 = [];
      let file = [];
      const id = req.params.id;
      const product = {
        nama: req.body.nama,
        harga: req.body.harga,
        kategori: req.body.kategori,
        deskripsi: req.body.deskripsi,
        minat: false,
      };
      await productService.updateProduct(id, product);
      const productPic = await productService.findProductPicByIdProduct(id);
      let cloudImage;

      if (req.files.length > 0) {
        if (productPic.length > 0) {
          for (var i = 0; i < productPic.length; i++) {
            cloudImage = productPic[i].gambar.substring(62, 82);
            cloudinaryDestroy(cloudImage);
          }
        }
        await productService.deleteProductPic(id);
        for (var i = 0; i < req.files.length; i++) {
          fileBase64.push(req.files[i].buffer.toString("base64"));
          file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
          const result = await cloudinaryUpload(file[i]);
          fotoProduk.push(result.secure_url);
          await productService.addProductPic({
            idProduct: id,
            gambar: fotoProduk[i],
          });
        }
      }

      res.status(200).json({
        message: "produk berhasil diperbaharui",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  // delete product
  async deleteProduct(req, res) {
    try {
      const id = req.params.id;

      const productPic = await productService.findProductPicByIdProduct(id);
      let cloudImage;

      if (productPic.length > 0) {
        for (var i = 0; i < productPic.length; i++) {
          cloudImage = productPic[i].gambar.substring(62, 82);
          cloudinaryDestroy(cloudImage);
        }
      }
      await productService.deleteProductPic(id);
      await productService.deleteProduct(id);

      res.status(200).json({
        message: "delete product berhasil",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
