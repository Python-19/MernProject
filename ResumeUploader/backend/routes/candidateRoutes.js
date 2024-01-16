import express from 'express'
const router=express.Router();
import { profileList, saveProfile } from '../controllers/candidateProfileControllers.js';

import upload from '../middleware/upload-middleware.js'
//Application Level Middleware For Parsing  multipart/form-data
router.use(
  "/resume",

  
    upload.fields([
      { name: "pimage", maxCount: 1 },
      { name: "rdoc", maxCount: 1 },
    ])
  
);
//Public Routes
router.post('/resume',saveProfile)
router.get("/list", profileList);
export default router;