import express from "express";
// import { welcome } from "../controllers/auth.js";
import * as auth from "../controllers/auth.js";

const router = express.Router();

//will contain get,post,put,delete
router.get('/', auth.welcome);

export default router;