const transactionService = require("../../../services/transactionService");
const jwt = require("jsonwebtoken");

function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SIGNATURE_KEY || "team1");
    } catch (error) {
        return false;
    }
}

module.exports = {
    getByIdBuyer: async (req, res) => {
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split("Bearer ")[1];
        let tokenPayload = await verifyToken(token);
        const idUser = tokenPayload.id;

        try {
            transactionService.getByIdBuyer(idUser).then((transactions) => {
                res.status(200).json({
                    status: "TR_BUYER",
                    transactions,
                });
            });
        } catch (error) {
            res.status(500).json({
                status: "ERROR",
                message: error.message,
            });
        }
    },

    getByIdSeller: async (req, res) => {
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split("Bearer ")[1];
        let tokenPayload = await verifyToken(token);
        const idSeller = tokenPayload.id;

        try {
            transactionService.getByIdSeller(idSeller).then((transactions) => {
                res.status(200).json({
                    status: "TR_SELLER",
                    transactions,
                });
            });
        } catch (error) {
            res.status(500).json({
                status: "ERROR",
                message: error.message,
            });
        }
    },

    createTransaction: async (req, res) => {
        try {
            transactionService.create(req.query).then((transaction) => {
                res.status(201).json({
                    status: "OK",
                    transaction,
                });
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    },

    updateTransaction: async (req, res) => {
        const {id, status} = req.query;
        try {
            transactionService.update(id, status).then(() => {
                res.status(200).json({
                    status: "UPDATED",
                    message: "Transaction updated",
                });
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    },

    updateTransactionStatus: async (req, res) => {
        try {
            let {id, idProduk, status, terjual} = req.query;
            terjual === "true" ? (terjual = true) : (terjual = false);
            const updateArgs = {id, idProduk, status, terjual};
            if (status === "Selesai") await transactionService.updateAllTransaction(idProduk);

            transactionService.updateStatus(updateArgs).then(() => {
                res.status(200).json({
                    status: "DONE",
                    message: "Transaction updated",
                });
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    },

    deleteTransaction: async (req, res) => {
        transactionService.delete(req.params.id);
        res.status(200).json({
            status: "DELETE_SUCCESS",
        });
    },
};
