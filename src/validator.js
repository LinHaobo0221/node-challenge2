const {body} = require("express-validator");

module.exports = [
  body('userid').custom((it) => {
    const str = it.trim()
    return str.length > 0 && str.length < 100;
  }),
  body('wish').notEmpty(),
]