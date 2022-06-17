const productsRepository = require("../repositories/productsRepository");

class ProductsService {
  static async create({
    user_id,
    name,
    price,
    category,
    description,
    picture,
    isPublish,
  }) {
    try {
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Nama produk wajib diisi",
          data: {
            data: null,
          },
        };
      }

      if (!price) {
        return {
          status: false,
          status_code: 400,
          message: "Harga produk wajib diisi",
          data: {
            data: null,
          },
        };
      }

      if (!category) {
        return {
          status: false,
          status_code: 400,
          message: "Kategori produk wajib diisi",
          data: {
            data: null,
          },
        };
      }

      if (!description) {
        return {
          status: false,
          status_code: 400,
          message: "Deskripsi produk wajib diisi",
          data: {
            data: null,
          },
        };
      }

      if (!picture) {
        return {
          status: false,
          status_code: 400,
          message: "Gambar produk wajib diisi",
          data: {
            data: null,
          },
        };
      } else if (picture.length > 4) {
        return {
          status: false,
          status_code: 400,
          message: "Maksimal Gambar Per Postingan adalah 4 Gambar",
          data: {
            registered_user: null,
          },
        };
      }

      const createdProducts = await productsRepository.create({
        user_id,
        name,
        price,
        category,
        description,
        picture,
        isPublish,
      });

      return {
        status: true,
        status_code: 201,
        message: "Product created successfully",
        data: {
          created_product: createdProducts,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          data: null,
        },
      };
    }
  }

  static async getAll() {
    try {
      const getAll = await productsRepository.getAll();

      return {
        status: true,
        status_code: 200,
        message: "Products successfully loaded",
        data: {
          getDataAll: getAll,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async getProductById({ id }) {
    try {
      const getProductById = await productsRepository.getProductById({
        id,
      });
      return {
        status: true,
        status_code: 200,
        message: "success get data",
        data: {
          getdata: getProductById,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          data: null,
        },
      };
    }
  }
  static async updateProductById({
    id,
    user_id,
    name,
    price,
    category,
    description,
    picture,
    isPublish,
  }) {
    try {
      const getProduct = await productsRepository.getProductById({
        id,
      });

      if (getProduct.user_id == user_id) {
        const updatedProduct = await productsRepository.updateProductById({
          id,
          name,
          price,
          category,
          description,
          picture,
          isPublish,
        });

        return {
          status: true,
          status_code: 200,
          message: "Product updated successfully",
          data: {
            updated_product: updatedProduct,
          },
        };
      } else {
        return {
          status: true,
          status_code: 401,
          message: "Resource Unauthorized",
          data: {
            updated_post: null,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          data: null,
        },
      };
    }
  }

  static async deleteProductById({ user_id, id }) {
    try {
      const getProduct = await productsRepository.getProductById({
        id,
      });

      if (getProduct.user_id == user_id) {
        const deletedProduct = await productsRepository.deleteProductById({
          id,
        });

        return {
          status: true,
          status_code: 200,
          message: "Product deleted successfully",
          data: {
            deleted_product: deletedProduct,
          },
        };
      } else {
        return {
          status: true,
          status_code: 401,
          message: "Resource Unauthorized",
          data: {
            data: null,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          data: null,
        },
      };
    }
  }

  static async filterByCategory({ category }) {
    try {
      const getAll = await productsRepository.getAll({
        category,
      });

      return {
        status: true,
        code_status: 200,
        message: "data produk berhasil ditampilkan",
        data: {
          data: getAll,
        },
      };
    } catch (err) {
      return {
        status: false,
        code_status: 500,
        message: err.message,
        data: {
          data: null,
        },
      };
    }
  }
}

module.exports = ProductsService;
