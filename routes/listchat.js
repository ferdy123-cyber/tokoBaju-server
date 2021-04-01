const { Router } = require("express");
const { addListchat, allListchat } = require("../controllers/listchat");

const { Authorization } = require("../middleware/authorization");

const router = Router();

router.post("/", Authorization, addListchat);
router.get("/", allListchat);
module.exports = router;
