import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'; 

import connectDB from './config/db.js';
import router from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'

dotenv.config({ path: path.join(__dirname, '.env') });
connectDB();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', router);
app.use('/api/category',categoryRoutes)
app.use('/api/products',productRoutes)
app.use('/api/upload',uploadRoutes)

const _dirname=path.resolve()
app.use('/uploads',express.static(path.join(_dirname + '/uploads')))

app.listen(port, () => {
  console.log(` Server is running at http://localhost:${port}`);
});
