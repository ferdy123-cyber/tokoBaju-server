const { Router } = require("express");

const {
  addOrder,
  getByTransactionId,
  deleteByid,
  editOrder,
} = require("../controllers/orders");
const { authenticate } = require("../database/connection");

const { Authorization } = require("../middleware/authorization");

const router = Router();

router.post("/", Authorization, addOrder);
router.patch("/", Authorization, editOrder);
router.get("/:id", Authorization, getByTransactionId);
router.delete("/:id", Authorization, deleteByid);

module.exports = router;
