const express = require("express");
const controllers = require("../app/controllers");
const apiRouter = express.Router();

/**
 * TODO: Implement your own API
 *       implementations
 */

apiRouter.post("/api/v1/register", controllers.api.v1.userController.register);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
