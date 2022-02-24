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

const updateList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    // req.params.id is the listId
    List.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true })
      .then(list => {
        res.json(list)
      })
      .catch(err => {
        next(new HttpError("No list found with provided ID.", 404));
      })
  } else {
    next(new HttpError("No list title and/or position provided.", 422));
  }
}

const addCardToList = (req, res, next) => {
  let listId = req.body.card.listId;
  List.findByIdAndUpdate(listId, { "$push": { "cards": [req.body.card._id] } })
    .then(_ => next())
    .catch(err => {
      next(new HttpError("Mongoose failed to add cardId to list's cards array.", 500))
    })
}

const getListById = (req, res, next) => {
  let id = req.body.listId || req.params.id;
  List.
    findById(id)
    .then((mongoResponse) => {
      res.locals.list = mongoResponse;
      next();
    })
    .catch(err => {
      next(new HttpError("No such list", 404))
    })
}

const sendList = ((req, res, next) => {
  res.json(res.locals.list)
})

module.exports = {
  createList,
  updateBoardLists,
  updateList,
  getListById,
  sendList,
  addCardToList,
};