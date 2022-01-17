import app from './src/app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)
mongoose
    .connect(DB, 
        {useNewUrlParser: true})
    .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 9000;
const server = app.listen(port, () => {
      console.log(`App running on port ${port}...`);
});

