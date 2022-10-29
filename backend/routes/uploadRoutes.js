import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { isAuth } from '../utils.js';

const upload = multer();

const uploadRouter = express.Router();

uploadRouter.post('/', isAuth, upload.single('file'), async (req, res) => {
  cloudinary.config({
    cloud_name: 'homecarestore',
    api_key: '451982932753666',
    api_secret: 'rqir92MKEmo_FFfbTIu8CDes0WA',
    secure: true,
  });

  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };
  const result = await streamUpload(req);
  res.send(result);
});
export default uploadRouter;
