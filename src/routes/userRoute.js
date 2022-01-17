import express from "express";
import {userService} from "../lib/services/index"
import catchExceptions from '../lib/utils/catchExceptions';
import validateIncomingUserRequest from '../lib/services/userService/IncomingRequest';
import  logger from '../lib/utils/logger';
const router = express.Router();


router.post(
    "/",
    validateIncomingUserRequest,
    catchExceptions(async (req, res) => {
      const { name, username, email, password } = req.body;
      logger.info(
        `POST /api/v1/users email=${email.length} password=${password.length}`
      );

      const user = await userService.registerUser(email, password);
      console.log(req)
    //   req.session.userId = user.id;
      res.json({ 
          name,
          email
      });
    })
  );

export default router;