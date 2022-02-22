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
        // FIXME: Find is not needed here since the board is already returned
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
  let id = req.params.id || req.body.boardId;
  Board.
    findById(id).
    populate({
      path: 'lists',
      populate: { path: 'cards' }
    })
    .then((mongoResponse) => {
      res.locals.board = mongoResponse;
      next();
    })
    .catch(err => {
      console.log(err);
      next(new HttpError("No such board", 404))
    })
}

const sendBoard = (req, res, next) => {
  res.json(res.locals.board)
}

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoardById = getBoardById;
exports.sendBoard = sendBoard;
