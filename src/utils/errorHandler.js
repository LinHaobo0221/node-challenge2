const commonError = (error, req, res, next) => {
  if (error) {
    res.render("error", {
      error: error.message
    });
    return;
  }
  next();
};

module.exports = {
  commonError
};