const multer = require("multer");
const path = require("path");

// Путь к временной папке temp
const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Фильтр multer для файлов, только картинки
const multerFilter = (req, file, cb) => {
  // file.mimetype имеет вид image/jpeg, png, gif, jpg... if(file.mimetype.split('/')[0] !== "image")
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    const error = new Error(`Please, upload images only!`);
    error.status = 400;
    cb(error, false);
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: multerFilter,
});

module.exports = upload;
