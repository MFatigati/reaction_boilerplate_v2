const { check, oneOf } = require('express-validator');

exports.validateBoard = [check("board.title").not().isEmpty()];

exports.validateListCreate = [check("list.title").not().isEmpty()];

exports.validateListUpdate = oneOf([
  check("title")
    .not()
    .isEmpty(),
  check("position")
    .not()
    .isEmpty()
]);

exports.validateCardCreate = [
  check("card.title")
    .not()
    .isEmpty()
    .withMessage("No card title was provided"),
  check("listId")
    .exists()
    .withMessage("No list id provided")
];

// https://github.com/express-validator/express-validator/issues/108