const router = require("express").Router();
const upload = require("../middlewares/uploadImageToServer");
const toGoogle = require("./../middlewares/uploadToGoogle");

router.post("/upload-verification-image", upload.single("avatar"), toGoogle(), (req, res) => {
  console.log(process.env.project_id);

  res.json({ body: req.body, file: req.file });
});

module.exports = router;

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
