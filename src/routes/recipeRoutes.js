import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send('Recettes View')
    }  
);



export default router;