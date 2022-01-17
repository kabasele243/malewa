import express from 'express';
import { userRoutes , recipeRoutes } from './routes/index'
import logger from './lib/utils/logger.js'



const app = express();

// app.disable("x-powered-by");
app.set('trust proxy', 1) 

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/recipe", recipeRoutes);


app.use((error, req, res, next) => {
    logger.error(error);
    res.status(error.status || 500).json({ error: error.message });
});

export default app