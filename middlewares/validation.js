const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error && error.details[0].type === "string.min") {
      error.status = 400;
      error.message =
        "The 'password' field must have at least 3 characters long";
      next(error);
      return;
    }

    if (error && error.details[0].message === '"subscription" is required') {
      error.status = 400;
      error.message = "Missing required 'subscription' field";
      next(error);
      return;
    }

    if (error && error.details[0].type === "any.only") {
      error.status = 400;
      error.message =
        "Field 'subscription' must be one of [starter, pro, business]";
      next(error);
      return;
    }

    if (Object.keys(req.body).length === 0) {
      error.status = 400;
      error.message = "Missing fields";
      next(error);
      return;
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
