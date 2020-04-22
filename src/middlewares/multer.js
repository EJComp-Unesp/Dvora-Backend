const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
// const aws = require('aws-sdk');
// const multerS3 = require('multer-s3');

// require('dotenv').config();

var dir;
const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      if (req.originalUrl.includes('member'))
        dir = path.resolve(__dirname, '..', '..', 'public', 'uploads', 'member');
      else
        dir = path.resolve(__dirname, '..', '..', 'public', 'uploads', 'je');
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err)
          cb(err);

        file.key = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),
  // s3: multerS3({
  //   s3: new aws.S3(),
  //   bucket: process.env.BUCKET_NAME,
  //   contentType: multerS3.AUTO_CONTENT_TYPE,
  //   acl: 'public-read',
  //   key: (req, file, cb) => {
  //     crypto.randomBytes(16, (err, hash) => {
  //       if (err)
  //         cb(err);
  //       const fileName = `${hash.toString('hex')}-${file.originalname}`;

  //       cb(null, fileName);
  //     });
  //   }
  // }),
}

module.exports = {
  // storage: storageTypes[process.env.STORAGE_TYPE],
  storage: storageTypes.local,
  dest: dir,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {  //cb = callback
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    }
    else {
      cb(new Error('Invalid file type.'));
    }
  }
};