import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import multerS3 from "multer-s3";
import config from "./config";

export const s3 = new S3Client({
  region: config.AWS_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const uniqueSuffix = uuidv4();
      cb(null, uniqueSuffix + "_" + file.originalname);
    },
  }),
});
