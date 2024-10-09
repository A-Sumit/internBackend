import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import codeRoutes from './routes/codeRoutes.mjs';
import mongoose from 'mongoose';
const app = express();

const uri = "mongodb+srv://user:pass@cluster0.oyr9v.mongodb.net/";

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

app.use('/api', codeRoutes);

app.listen(8080, () => {
    console.log('Server running on port 8080');
});