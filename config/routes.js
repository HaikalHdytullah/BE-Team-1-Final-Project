const express = require("express");
const controllers = require("../app/controllers");
const apiRouter = express.Router();
const uploadOnMemory = require("../utils/uploadOnMemory");
const authController = require("../app/controllers/api/v1/authController");
const userController = require("../app/controllers/api/v1/userController");
const productController = require("../app/controllers/api/v1/productController");
const transactionController = require("../app/controllers/api/v1/transactionController");

const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./openapi.yaml");

/**
 * TODO: Implement your own API
 *       implementations
 */

// API Authentication
apiRouter.post("/api/v1/login", authController.login);
apiRouter.post("/api/v1/auth/google", authController.google);
apiRouter.post("/api/v1/register", userController.register);
apiRouter.get("/api/v1/whoami", userController.whoAmI);
apiRouter.delete("/api/v1/auth/delete/:email", userController.deleteAccount);
// API User
apiRouter.put(
  "/api/v1/profile",
  uploadOnMemory.single("gambar"),
  userController.updateProfile
);
// API Product
apiRouter.get("/api/v1/products", productController.listAll);
apiRouter.get("/api/v1/product", productController.getProductById);
apiRouter.get("/api/v1/product/seller", productController.getProductByIdSeller);
apiRouter.get(
  "/api/v1/product/kategory",
  productController.getProductByKategory
);
apiRouter.get(
  "/api/v1/product/minat",
  productController.getProductsByMinatAndSellerAndTerjual
);
apiRouter.get("/api/v1/product/name", productController.getProductByName);
apiRouter.post(
  "/api/v1/products",
  authController.authorize(1, 2),
  uploadOnMemory.array("gambar", 4),
  productController.addProduct
);
apiRouter.put(
  "/api/v1/products/:id",
  authController.authorize(1, 2),
  uploadOnMemory.array("gambar", 4),
  productController.updateProduct
);
apiRouter.delete(
  "/api/v1/products/:id",
  authController.authorize(1, 2),
  productController.deleteProduct
);
// API Transactions
apiRouter.get(
  "/api/v1/trBuyer",
  authController.authorize(1, 2),
  transactionController.getByIdBuyer
);
apiRouter.get(
  "/api/v1/trSeller",
  authController.authorize(1, 2),
  transactionController.getByIdSeller
);
apiRouter.post(
  "/api/v1/transaction",
  authController.authorize(1, 2),
  transactionController.createTransaction
);
apiRouter.put(
  "/api/v1/transaction",
  authController.authorize(1, 2),
  transactionController.updateTransaction
);
apiRouter.put(
  "/api/v1/transaction/status",
  authController.authorize(1, 2),
  transactionController.updateTransactionStatus
);
apiRouter.delete(
  "/api/v1/transaction/:id",
  authController.authorize(1, 2),
  transactionController.deleteTransaction
);
// API Docs
apiRouter.get("/api/v1/docs/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});
apiRouter.use(
  "/documentation",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// API Application
apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
