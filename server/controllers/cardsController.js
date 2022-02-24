// const List = require("../models/list");
// const Board = require("../models/board");
const Card = require("../models/card")
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err => next(new HttpError(`Card not found. No card with id: ${req.params.id}`, 404)))
}

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    req.body.card.listId = res.locals.list._id;
    req.body.card.boardId = res.locals.list.boardId;
    req.body.card.position = 65535.0;
    req.body.card.decription = "";
    req.body.card.labels = [];
    req.body.card.archived = false;
    req.body.card.dueDate = null;
    req.body.card.completed = false;
    req.body.card.comments = [];
    req.body.card.actions = [];
    req.body.card.commentsCount = 0;
    Card.create(req.body.card)
      .then((card) => {
        req.body.card = card;
        next();
      })
      .catch((err) =>
        next(new HttpError("Creating card failed, please try again", 500))
      );
  } else {
    return next(new HttpError(errors.errors[0].msg, 422));
  }
}

const sendCard = (req, res, next) => {
  res.json(req.body.card);
}

module.exports = {
  getCard,
  createCard,
  sendCard
}