const Board = require("../models/board");
require("../models/list");
require("../models/card");
const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json({
      boards,
    });
  });
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body.board)
      .then((board) => {
        Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(
          (board) => res.json({ board })
        );
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const getBoardById = (req, res, next) => {
  let id = req.params.id
  Board.
    findById(id).
    populate({
      path: 'lists',
      populate: { path: 'cards' }
    }).
    then(response => {
      res.json(response)
    }).
    catch(err => {
      console.log(err);
      next(new HttpError("No such board", 404))
    })
}

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoardById = getBoardById;
