import express from "express";
// import { welcome } from "../controllers/auth.js";
import * as auth from "../controllers/auth.js";

const router = express.Router();

//will contain get,post,put,delete
router.get('/', auth.welcome);
router.post('/pre-register', auth.preRegister); // get confirmation from valid email address
router.post('/register', auth.register); // create the register endpoint
router.post('/login', auth.login); // login 
export default router;