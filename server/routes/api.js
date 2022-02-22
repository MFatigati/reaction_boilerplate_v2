const express = require('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const { validateBoard, validateList } = require("../validators/validators");
const listController = require("../controllers/listsController");

router.get('/boards', boardsController.getBoards);

router.get('/boards/:id', boardsController.getBoardById, boardsController.sendBoard);

router.post('/boards', validateBoard, boardsController.createBoard);

router.post('/lists', boardsController.getBoardById, validateList, listController.createList, listController.updateBoardLists);

module.exports = router;