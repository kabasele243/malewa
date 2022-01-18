import express from 'express';
import session from 'express-session';
import { userRoutes , recipeRoutes } from './routes/index'
import logger from './lib/utils/logger.js'



const app = express();

// app.disable("x-powered-by");

app.use(
    session({
    secret: process.env.SESSION_SECRET || "secret",
    name: "session",
    resave: false,
    saveUninitialized: false,
      cookie: {
        sameSite: true,
        maxAge: 3600000, // 60 * 60 * 1000
        httpOnly: true,
        secure: true
      }
    })
  );

app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/recipe", recipeRoutes);


app.use((error, req, res, next) => {
    logger.error(error);
    res.status(error.status || 500).json({ error: error.message });
});

export default app