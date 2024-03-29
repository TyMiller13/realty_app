import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";
import authRoutes from "./routes/auth.js";
import adRoutes from "./routes/ad.js";



const app = express();

//db
mongoose.set('strictQuery', false);

mongoose.connect(MONGO_URL)
.then(() => console.log('database_connected'))
.catch((err) => console.log(err));

// middleware
app.use(express.json({limit: "10mb"}));
app.use(morgan('dev'));
app.use(cors());

//routes middleware
app.use('/api', authRoutes);
app.use('/api', adRoutes);

app.listen(8000, () => console.log("server is running on port 8000"));