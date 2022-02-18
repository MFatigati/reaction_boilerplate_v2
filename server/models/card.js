const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The List title is required']
  },
  dueDate: {
    type: Date
  },
  labels: [{
    type: String
  }],
  description: {
    type: String
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: "List"
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: "Board"
  },
  position: {
    type: Number
  },
  commentCount: {
    type: Number,
  }
})

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;