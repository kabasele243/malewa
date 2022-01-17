const catchExceptions = func => {
  return (req, res, next) => {
    Promise.resolve(func(req, res)).catch(next);
  };
};

export default catchExceptions;