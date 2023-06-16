const validation = (schema) => {
  return (req, res, next) => {
    
    const { error } = schema.validate(req.body);

    if (Object.keys(req.body).length === 0) {
      error.status = 400;
      error.message = "Missing fields";
      next(error);
    }

    if (error) {
      // console.log(error.details[0].path[0]);
      const errField = error.details[0].path[0];
      error.status = 400;
      error.message = `Missing required '${errField}' field`;
      next(error);
    }
    next();
  };
};

module.exports = validation;
