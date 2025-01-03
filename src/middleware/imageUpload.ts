import multer from "multer";
import path from "path";
import fs from "fs";

// Directory for uploads
const uploadDir = path.join(__dirname, "../uploads");

//make sure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // unique file name useing date
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."));
  }
};

// Export image upload middleware
export const imageUpload = multer({
  storage,
  fileFilter,
});
