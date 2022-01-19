import { promisify  } from "util";
import jwt from 'jsonwebtoken';
import User from '../services/userService/UserModel';
import StatusError from "./StatusError";

const userIsLogged = async(req, res, next) => {

  if (req.cookies.jwt) {
    try {
        
          const decoded = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.JWT_SECRET
          );
          
          const currentUser = await User.findById(decoded.id);
          if (!currentUser) {
            return next();
          }
    
          
          if (currentUser.changedPasswordAfter(decoded.iat)) {
            return next();
          }
          console.log({currentUser})
    
          
          res.locals.user = currentUser;
    } catch(err){
      return next(new StatusError("Sorry But this profile doesn't not exist"));
    }
 
  }
  return next();
};

export default userIsLogged;