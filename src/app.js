import express from 'express';
import logger from './lib/utils/logger.js'



const app = express();

app.use((error, req, res, next) => {
    logger.error(error);
    res.status(error.status || 500).json({ error: error.message });
});

export default app