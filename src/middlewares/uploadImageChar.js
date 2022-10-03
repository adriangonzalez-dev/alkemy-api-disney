const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, path.join(__dirname, '../../public/img/characters'));
    },
    filename: function (req, file, cb) {
       cb(null, `${Date.now()}_character_${path.extname(file.originalname)}`);  }
  })

  const characterImage = multer({ storage });

  module.exports = characterImage;
