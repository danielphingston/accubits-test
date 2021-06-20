const multer = require("multer");
const path = require("path");
const { mkdirSync, readFile } = require("fs");

const FileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destination = getFileDestination();
        mkdirSync(destination, { recursive: true });
        cb(null, destination);
    },
    filename: (req, file, cb) => {
        //todo: save file with different name so that it doesnt overwrite
        cb(null, file.originalname);
    },
});

const fileUpload = multer({
    fileFilter: (req, file, cb) => {
        //todo: add filter for csv
        cb(null, true);
    },
    storage: FileStorage,
});

/**
 *
 * @returns {String} fileDestination
 */
function getFileDestination() {
    return path.join(process.cwd(), "uploads");
}

module.exports = { fileUpload, getFileDestination };
