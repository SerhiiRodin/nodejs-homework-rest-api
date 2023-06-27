const multer = require("multer");
const path = require("path");

// Путь к временной папке temp
const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: multerConfig });

module.exports = upload;


