import multer from "multer";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    cb(isValid ? null : new AppError("Invalid file type!", 422), isValid);
  },
});

export default fileUpload;
