import Joi from 'joi'

const schema = Joi.object().keys({
  name: Joi.string().min(1).max(200).required(),
  username: Joi.string().min(1).max(200).required(),
  email: Joi.string().min(1).max(255).required(),
  password: Joi.string().min(1).max(255).required()
});

export default (req, res, next) => {
    // const result = Joi.validate(req.body, schema);
  
    // if (result.error) {
    //   return next(new Error(result.error));
    // }
  
    return next();
  };
  
