import express from "express";
import userIsLoggedIn from "../lib/utils/userIsLoggedIn";

const router = express.Router();

router.get("/", 
    userIsLoggedIn,
    (req, res) => {
        // console.log(res.locals.user)
    res.send(res.locals.user)
    }  
);



export default router;