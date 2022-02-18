const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ListSchema = require("./list");

const BoardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Board title is required']
  },
  lists: [{
    type: Schema.Types.ObjectId, 
    ref: "List"
  }]
}, {
  timestamps: { createdAt: true, updatedAt: false }
})

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;