const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-mddleware");
const uploadMiddleware = require("../middleware/upload-middleware");
const { uploadImageController, deleteImageController } = require("../controller/image-controller");
const { route } = require("./auth-routes");

const router = express.Router();

//upload the image
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImageController,
  deleteImageController
);

//get all images
router.get("/get", authMiddleware)

//delete image routes
router.delete("/:id", authMiddleware, adminMiddleware, deleteImageController);

module.exports = router;
 