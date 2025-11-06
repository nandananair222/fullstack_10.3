const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../utils/s3');

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET,
    acl: 'public-read',
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      cb(null, `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = upload;
