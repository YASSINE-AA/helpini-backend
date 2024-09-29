import { GridFsStorage } from 'multer-gridfs-storage';
import * as multer from 'multer';

const storage = new GridFsStorage({
  url: 'mongodb://localhost/nest', // Update with your MongoDB URI
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: 'profilePictures', // Collection name in MongoDB
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

export const upload = multer({ storage });