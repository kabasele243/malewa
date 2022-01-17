import express from "express";
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
      res.json({
          name,
          username,
          email, 
          password
      })
    //   const user = await userService.registerUser(email, password);
    //   req.session.userId = user.id;
    //   res.json(UserView(user));
    })
  );

export default router;