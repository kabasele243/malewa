import express from "express";
import userIsLoggedIn from "../lib/utils/userIsLoggedIn";
import { userService } from "../lib/services/index";
import catchExceptions from '../lib/utils/catchExceptions';
import validateIncomingUserRequest from '../lib/services/userService/IncomingRequest';
import  logger from '../lib/utils/logger';
import { createSendToken } from "../lib/utils/auth";
const router = express.Router();


router.post(
    "/",
    validateIncomingUserRequest,
    catchExceptions(async (req, res) => {
      const { name, username, email, password } = req.body;
      logger.info(
        `POST /api/v1/users email=${email.length} password=${password.length}`
      );

      const user = await userService.registerUser(email, username, password);
      createSendToken(user, 201, req, res);
    })
  );

router.post(
    "/login",
    validateIncomingUserRequest,
    catchExceptions(async (req, res) => {
      const { email, password } = req.body;
      logger.info(
        `POST /api/v1/login email=${email.length} password=${password.length}`
      );
      const user = await userService.login(email, password);
      createSendToken(user, 201, req, res);
     
    })
);
  
router.get(
    "/logout",
    catchExceptions(async (req, res) => {
        logger.info("GET /api/v1/logout");
        res.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
          });
        res.status(200).json({ status: 'success' });
    })
  );
  
router.get(
    "/logged-in",
    userIsLoggedIn,
    catchExceptions(async (req, res) => {
      logger.info(`GET /api/v1/users/logged-in userId=${req.session.userId}`);
    //   const user = await userService.getUser(req.session.userId);
    //   res.json({ 
    //     email
    // });
    console.log(req, 'lisolo')
    })
);

export default router;