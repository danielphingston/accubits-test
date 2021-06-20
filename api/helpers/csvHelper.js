const csv = require("csv-parse");
const fs = require("fs");
const path = require("path");
const { writeToErrorLog } = require("./rowHandler");

function parseFile(filePath, handleRow) {
    if (!handleRow) {
        throw new Error("handleRow Missing");
    }
    fs.createReadStream(filePath)
        .pipe(csv({ columns: ["email", "content", "title"], info: true }))
        .on("data", (row) => {
            if (row.record.email == "email") return;
            handleRow(row.record, filePath, row.info);
        })
        .on("error", (err) => {
            console.log(err.message);
            writeToErrorLog({
                status: "error while parsing csv",
                reason: err.message,
                file: filePath,
                row: 0,
            });
        });
}

module.exports = { parseFile };
