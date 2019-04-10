// const multer = require("multer");
const multer = require("multer");

// module.exports = upload;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const extention = file.originalname.split(".")[file.originalname.split(".").length - 1];
    cb(null, `${file.filename}.${extention}`);
  },
});

module.exports = multer({ storage });
//   {
//     "body": {},
//     "file": {
//         "fieldname": "avatar",
//         "originalname": "Tempo_Web.png",
//         "encoding": "7bit",
//         "mimetype": "image/png",
//         "destination": "uploads/",
//         "filename": "98df52f08f4308eec65416b2908169c2",
//         "path": "uploads/98df52f08f4308eec65416b2908169c2",
//         "size": 24500
//     }
// }
