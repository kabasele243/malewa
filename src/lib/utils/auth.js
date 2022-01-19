import jwt from 'jsonwebtoken';
import { promisify  } from "util";
import User from '../services/userService/UserModel';
import catchExceptions from '../utils/catchExceptions';
import StatusError from "./StatusError";


export const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
};
  
export const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
  
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
  
    // Remove password from output
    user.password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
};

export const protectRoute = catchExceptions(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      return next(
        new StatusError('You are not logged in! Please log in to get access.', 401)
      );
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
  
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new StatusError('User recently changed password! Please log in again.', 401)
      );
    }
  
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    return next();
  });


export const userIsLogged = async(req, res, next) => {

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
            
            res.locals.user = currentUser;
      } catch(err){
        return next(new StatusError("Sorry But this profile doesn't not exist"));
      }
   
    }
    return next();
  };