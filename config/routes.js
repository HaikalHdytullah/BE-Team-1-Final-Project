const express = require("express");
const controllers = require("../app/controllers");
const apiRouter = express.Router();
const upload = require("../utils/fileUpload");

/**
 * TODO: Implement your own API
 *       implementations
 */

apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.post("/api/v1/register", controllers.api.v1.userController.register);

// Define Routes Products
apiRouter.get("/api/v1/products", controllers.api.v1.productController.getAll);
// apiRouter.post(
//   "/api/v1/products/create",
//   controllers.api.v1.upload.fields([{ name: "picture" }]),
//   productController.create
// );
// apiRouter.get(
//   "/api/v1/products/:id",
//   controllers.api.v1.productController.getProductById
// );
// apiRouter.put(
//   "/api/v1/products/:id",
//   controllers.api.v1.upload.fields([{ name: "picture" }]),
//   productController.updateProductById
// );
// apiRouter.delete(
//   "/api/v1/products/:id",
//   controllers.api.v1.productController.deleteProductById
// );
// apiRouter.get(
//   "/api/v1/productss/filter/category?",
//   productController.filterByCategory
// );

// Public File Access
// apiRouter.use(
//   "/public/files",
//   express.static(path.join(__dirname, "/storages"))
// );
apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
