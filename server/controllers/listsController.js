const List = require("../models/list");
const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let newList = {
      boardId: req.body.boardId,
      title: req.body.list.title
    }
    List.create(newList)
      .then((list) => {
        res.locals.newList = list;
        next()
      })
      .catch((err) =>
        next(new HttpError("boardId does not exist; cannot create list for non-existent boardId", 404))
      );
  } else {
    return next(new HttpError("Unprocessable Entity.", 422));
  }
};

const updateBoardLists = ((req, res, next) => {
  Board.findByIdAndUpdate(res.locals.newList.boardId, { "$push": { "lists": [res.locals.newList._id] } })
    .then(_ => {
      res.json(res.locals.newList);
    });
});

module.exports = {
  createList,
  updateBoardLists,

};