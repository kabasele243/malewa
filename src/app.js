import express from 'express';
import cookieParser from 'cookie-parser';
import { userRoutes , recipeRoutes } from './routes/index'
import logger from './lib/utils/logger.js'



const app = express();

app.use(cookieParser());

app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/recipe", recipeRoutes);


app.use((error, req, res, next) => {
    logger.error(error);
    res.status(error.status || 500).json({ error: error.message });
});

export default app