const { Router } = require("express");
const {
  addTransaction,
  findById,
  getAllByUser,
  deleTransaction,
  editTransaction,
  allTransaction,
} = require("../controllers/transaction");

const { Authorization } = require("../middleware/authorization");

const router = Router();

router.get("/all", Authorization, allTransaction);
router.post("/", Authorization, addTransaction);
router.get("/:id", Authorization, findById);
router.get("/", Authorization, getAllByUser);
router.delete("/:id", Authorization, deleTransaction);
router.patch("/", Authorization, editTransaction);

module.exports = router;
