import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import codeRoutes from './routes/codeRoutes.mjs';
import { apiLimiter } from './middleware/rateLimit.mjs';
import mongoose from 'mongoose';
const app = express();
dotenv.config();
const uri = process.env.URL;


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB Atlas:', err));


app.use(cors({
    origin: '*'
  }));

app.use(bodyParser.json());
app.use(apiLimiter);
app.use('/api', codeRoutes);

app.listen(8080, () => {
    console.log('Server running on port 8080');
});