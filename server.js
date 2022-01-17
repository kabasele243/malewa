import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './src/app';


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)

mongoose
    .connect(DB, 
        {useNewUrlParser: true})
    .then(() => console.log('DB connection successful!'));

const port = process.env.PORT;
const server = app.listen(port, () => {
      console.log(`App running on port ${port}...`);
});

