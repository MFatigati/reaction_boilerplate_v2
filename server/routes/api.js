const express = require('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const { validateBoard, validateListCreate, validateListUpdate, validateCardCreate } = require("../validators/validators");
const listController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController")

router.get('/boards', boardsController.getBoards);

router.get('/boards/:id', boardsController.getBoardById, boardsController.sendBoard);

router.post('/boards', validateBoard, boardsController.createBoard);

//router.get('/lists/:id', listController.getListById, listController.sendList); This route is for testing listController.getListById

router.post('/lists', boardsController.getBoardById, validateListCreate, listController.createList, listController.updateBoardLists);

router.put('/list/:id', validateListUpdate, listController.updateList);

router.get('/cards/:id', cardsController.getCard)

router.post('/cards', validateCardCreate, listController.getListById, cardsController.createCard, listController.addCardToList, cardsController.sendCard);

module.exports = router;