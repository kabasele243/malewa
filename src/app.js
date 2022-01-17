import express from 'express';
import { userRoutes , recetteRoutes } from './routes/index'
import logger from './lib/utils/logger.js'



const app = express();


app.use("/api/user", userRoutes);
app.use("/api/recette", recetteRoutes);


app.use((error, req, res, next) => {
    logger.error(error);
    res.status(error.status || 500).json({ error: error.message });
});

export default app