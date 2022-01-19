import express from "express";
import { protectRoute, userIsLogged } from '../lib/utils/auth';

const router = express.Router();

router.get("/", 
    protectRoute,
    userIsLogged,
    (req, res) => {
    res.send(res.locals.user)
    }  
);



export default router;