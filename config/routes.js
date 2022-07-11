const express = require("express");
const controllers = require("../app/controllers");
const apiRouter = express.Router();
const upload = require("../utils/fileUpload");
const uploadOnMemory = require("../utils/uploadOnMemory");

/**
 * TODO: Implement your own API
 *       implementations
 */

apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.post("/api/v1/auth/google", controllers.api.v1.authController.google);
apiRouter.post("/api/v1/register", controllers.api.v1.userController.register);
apiRouter.get("/api/v1/whoami", controllers.api.v1.userController.whoAmI);

apiRouter.put(
  "/api/v1/profile",
  uploadOnMemory.single("gambar"),
  controllers.api.v1.userController.updateProfile
);

// Define Routes Products
apiRouter.get("/api/v1/products", controllers.api.v1.productController.listAll);
apiRouter.get(
  "/api/v1/daftarjual",
  controllers.api.v1.productController.getProductByIdSeller
);
apiRouter.get(
  "/api/v1/product",
  controllers.api.v1.productController.getProductById
);
apiRouter.get(
  "/api/v1/product/kategory",
  controllers.api.v1.productController.getProductByKategory
);
apiRouter.get(
  "/api/v1/product/minat",
  controllers.api.v1.productController.getProductsByMinatAndSellerAndTerjual
);
apiRouter.get(
  "/api/v1/product/name",
  controllers.api.v1.productController.getProductByName
);
// add product
apiRouter.post(
  "/api/v1/products",
  controllers.api.v1.authController.authorize(1, 2),
  uploadOnMemory.array("gambar", 4),
  controllers.api.v1.productController.addProduct
);
// update product
apiRouter.put(
  "/api/v1/products/:id",
  controllers.api.v1.authController.authorize(1, 2),
  uploadOnMemory.array("gambar", 4),
  controllers.api.v1.productController.updateProduct
);
// delete product
apiRouter.delete(
  "/api/v1/products/:id",
  controllers.api.v1.authController.authorize(1, 2),
  controllers.api.v1.productController.deleteProduct
);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
