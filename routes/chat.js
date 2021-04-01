const { Router } = require("express");
const { addChat, AllChat, chatbyAdmin } = require("../controllers/chat");

const { Authorization } = require("../middleware/authorization");

const router = Router();

router.post("/", Authorization, addChat);
router.get("/", Authorization, AllChat);
router.get("/admin", Authorization, chatbyAdmin);
module.exports = router;
