const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, path.join(__dirname, '../../public/img/characters'));
    },
    filename: function (req, file, cb) {
       cb(null, `${Date.now()}_character_${path.extname(file.originalname)}`);  }
  })

const filterMimetype = (req, file, cb) => {
   const filetypes = /jpeg|jpg|png|gif/
   const mimetype = filetypes.test(file.mimetype)
   const extname = filetypes.test(path.extname(file.originalname))
   if (mimetype && extname) {
      return cb(null, true)
   }
   cb('Solo se admiten jpeg,jpg,png o gif')
}

  const characterImage = multer({ storage, fileFilter:filterMimetype });

  module.exports = characterImage;
