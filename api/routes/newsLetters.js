const express = require("express");
const { parseFile } = require("../helpers/csvHelper");
const { fileUpload } = require("../helpers/fileHelper");
const { handleRow } = require("../helpers/rowHandler");
const router = express.Router();

/* GET home page. */
router.post("/", fileUpload.single("csv_file"), function (req, res, next) {
    parseFile(req.file.path, handleRow);
    res.status(202).json({ status: "accepted" });
});

module.exports = router;
