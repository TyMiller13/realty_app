import express from "express";
const router = express.Router();
// import { welcome } from "../controllers/auth.js";
import * as ad from "../controllers/ad.js";
import { requireLogin } from "../middleware/auth.js";


router.post('/upload-image', requireLogin, ad.uploadImage);
router.post('/remove-image', requireLogin, ad.removeImage);
router.post('/ad', requireLogin, ad.create);
router.get('/ads', ad.ads )
export default router;