import express from "express";
import userIsLoggedIn from "../lib/utils/userIsLoggedIn";
import { userService } from "../lib/services/index";
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

      const user = await userService.registerUser(email, username, password);
      req.session.userId = user.id;
      res.json({ 
          name,
          email
      });
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
      console.log(user)
      req.session.userId = user.id;
      res.json({ 
        email
    });
    })
);
  
router.get(
    "/logout",
    catchExceptions(async (req, res) => {
      logger.info("GET /api/v1/logout");
      await req.session.destroy();
      res.end();
    })
  );
  
router.get(
    "/logged-in",
    userIsLoggedIn,
    catchExceptions(async (req, res) => {
      logger.info(`GET /api/v1/users/logged-in userId=${req.session.userId}`);
      const user = await userService.getUser(req.session.userId);
      res.json({ 
        email
    });
    })
);

export default router;