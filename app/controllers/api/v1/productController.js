const productService = require("../../../services/productServices");
const {promisify} = require("util");
const cloudinary = require("../../../../utils/cloudinary");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);
const cloudinaryDestroy = promisify(cloudinary.uploader.destroy);

module.exports = {
    async listAll(req, res) {
        try {
            const product = await productService.list();
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

    async getProductByIdSeller(req, res) {
        try {
            const product = await productService.getProductByIdSeller(req.query.idUser);
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

    async getProductsByMinatAndSellerAndTerjual(req, res) {
        try {
            let {idUser, minat, terjual} = req.query;
            minat === "true" ? (minat = true) : (minat = false);
            terjual === "true" ? (terjual = true) : (terjual = false);
            const data = await productService.findByUser({idUser, minat, terjual});
            if (data.length === 0) {
                res.status(404).json({
                    message: "Product is Empty",
                });
                return;
            }
            res.status(200).json({
                data,
                status: "Get All By IdUser And Status",
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    },

    async getProductById(req, res) {
        try {
            const product = await productService.findById(req.query.id);
            if (product !== null) {
                const product_data = JSON.parse(JSON.stringify(product));
                delete product_data.user.password;
                res.status(200).json(product_data);
            } else {
                res.status(404).json({
                    message: "product not found",
                });
            }
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
        }
    },

    async addProduct(req, res) {
        try {
            let fotoProduk = [];
            let fileBase64 = [];
            let file = [];
            const product = {
                idUser: req.user.id,
                nama: req.body.nama,
                harga: req.body.harga,
                kategori: req.body.kategori,
                deskripsi: req.body.deskripsi,
                minat: false,
                terjual: false,
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
            const product_data_update = JSON.parse(JSON.stringify(response_data));
            delete product_data_update.user.password;

            res.status(200).json({
                message: "tambah produk berhasil",
                product: product_data_update,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    },

    async updateProduct(req, res) {
        try {
            let fotoProduk = [];
            let fileBase64 = [];
            let file = [];
            const idProduct = req.params.id;
            const product = {
                nama: req.body.nama,
                harga: req.body.harga,
                kategori: req.body.kategori,
                deskripsi: req.body.deskripsi,
                minat: false,
            };
            const imgTemp = req.body.imgTemp;

            // Get Gambar Produk dari tabel productpics
            const productPic = await productService.findProductPicByIdProduct(idProduct);
            // Update Data Produk di tabel products
            await productService.updateProduct(idProduct, product);

            // Delete Gambar Produk di tabel productpics dan Cloudinary
            if (imgTemp !== undefined) {
                if (Array.isArray(imgTemp)) {
                    // Kalo bentuknya array
                    for (let x = 0; x < imgTemp.length; x++) {
                        cloudinaryDestroy(imgTemp[x].substring(65, 85));
                        if (imgTemp[x] === productPic[x].gambar) {
                            await productService.deleteProductPic(productPic[x].id);
                        }
                    }
                } else {
                    // Kalo bentuknya string cuma 1 image
                    for (let y = 0; y < productPic.length; y++) {
                        if (imgTemp === productPic[y].gambar) {
                            cloudinaryDestroy(imgTemp.substring(65, 85));
                            await productService.deleteProductPic(productPic[y].id);
                        }
                    }
                }
            }

            // Upload Gambar Produk ke Cloudinary dan Tambahkan ke tabel productpics
            for (let i = 0; i < req.files.length; i++) {
                fileBase64.push(req.files[i].buffer.toString("base64"));
                file.push(`data:${req.files[i].mimetype};base64,${fileBase64[i]}`);
                const result = await cloudinaryUpload(file[i]);
                fotoProduk.push(result.secure_url);
                await productService.addProductPic({
                    idProduct,
                    gambar: fotoProduk[i],
                });
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
