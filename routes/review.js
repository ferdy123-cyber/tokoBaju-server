const { Router } = require("express");

const { addReview, getReview } = require("../controllers/review");

const { Authorization } = require("../middleware/authorization");

const router = Router();

router.post("/", Authorization, addReview);
router.get("/", getReview);

module.exports = router;
