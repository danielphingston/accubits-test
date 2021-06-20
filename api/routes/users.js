const express = require("express");

const router = express.Router();
const model = require("../models");
/**
 * @type {import("sequelize").ModelDefined<user,null>}
 */
const User = model["User"];

/* GET users listing. */
router.get("/", async (req, res, next) => {
    const users = await User.findAll();
    res.json(users);
});

router.post("/", async (req, res, next) => {
    const user = req.body;
    if (!user.email || !user.firstName || !user.lastName) {
        res.status(400).json({ error: "missing user details" });
        return;
    }
    if (!validEmail(user)) {
        res.status(400).json({ error: "Invalid Email" });
        return;
    }
    try {
        const newUser = await User.create(user);
        res.json("User created Successfully");
    } catch (error) {
        if (error.name == "SequelizeUniqueConstraintError") {
            res.status(400).json({ error: "Email Already Used!" });
        } else {
            console.debug(error);
            res.sendStatus(500);
        }
    }
});

module.exports = router;
function validEmail(user, res) {
    const simpleEmailRegex = /^(.+)@(.+)$/;
    return simpleEmailRegex.test(user.email);
}
