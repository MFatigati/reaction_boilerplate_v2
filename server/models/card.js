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
  commentsCount: {
    type: Number,
  },
  actions: [{
    type: String,
  }],
  completed: {
    type: Boolean,
  },
  comments: [
    {
      type: String,
    }
  ],
}, {
  //timestamps: { createdAt: true, updatedAt: true }
  timestamps: true
})
// {
//   "_id": 9,
//   "title": "My new card",
//   "description": "",
//   "labels": [],
//   "listId": 13,
//   "position": 65535.0,
//   "archived": false,
//   "createdAt": "2020-10-08T17:54:55.285Z",
//   "updatedAt": "2020-10-08T17:54:55.285Z",
//   "dueDate": null,
//   "completed": false,
//   "boardId": 1,
//   "comments": [],
//   "actions": []
//   "commentsCount": 0
// }

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;