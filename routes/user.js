const { Router } = require("express");
const { register, login, getUser } = require("../controllers/user");

const { Authorization } = require("../middleware/authorization");

const router = Router();

router.get("/get", Authorization, getUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
