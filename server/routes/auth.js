import express from "express";
const router = express.Router();
// import { welcome } from "../controllers/auth.js";
import * as auth from "../controllers/auth.js";
import { requireLogin } from "../middleware/auth.js";

//will contain get,post,put,delete
router.get('/', requireLogin, auth.welcome);
router.post('/pre-register', auth.preRegister); // get confirmation from valid email address
router.post('/register', auth.register); // create the register endpoint
router.post('/login', auth.login); // login 
router.post('/forgot-password', auth.forgotPassword);// forgot password
router.post('/access-account', auth.accessAccount); // account access
router.get('/refresh-token', auth.refreshToken)
router.get('/current-user', requireLogin, auth.currentUser)



export default router;