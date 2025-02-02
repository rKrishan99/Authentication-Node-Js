const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-mddleware");
const uploadMiddleware = require("../middleware/upload-middleware");
const { uploadImageController } = require("../controller/image-controller");

const router = express.Router();

//upload the image
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImageController
);

//get all images

module.exports = router;
