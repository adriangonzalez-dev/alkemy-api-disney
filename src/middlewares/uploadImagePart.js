const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, path.join(__dirname, '../../public/img/participations'));
    },
    filename: function (req, file, cb) {
       cb(null, `${Date.now()}_participation_${path.extname(file.originalname)}`);  
      }
  })

  const participationImage = multer({ storage });

  module.exports = participationImage;
