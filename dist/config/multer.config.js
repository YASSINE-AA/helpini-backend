"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const multer = require("multer");
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: 'mongodb://localhost/nest',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: 'profilePictures',
            filename: `${Date.now()}-${file.originalname}`,
        };
    },
});
exports.upload = multer({ storage });
//# sourceMappingURL=multer.config.js.map