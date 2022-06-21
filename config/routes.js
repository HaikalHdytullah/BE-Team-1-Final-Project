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

apiRouter.put(
  "/api/v1/profile",
  uploadOnMemory.single("gambar"),
  controllers.api.v1.userController.updateProfile
);

// Define Routes Products
apiRouter.get("/api/v1/products", controllers.api.v1.productController.listAll);
// add product
apiRouter.post(
  "/api/v1/products",
  uploadOnMemory.array("image", 4),
  controllers.api.v1.productController.addProduct
);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
