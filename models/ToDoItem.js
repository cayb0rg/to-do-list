var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToDoItemSchema = new Schema({
    name: String,
    description: String,
    dueDate: Date,
    priority: Number,
    project: [{type: Schema.Types.ObjectId, ref: 'Project'}],
})

var ToDoItem = mongoose.model('ToDoItem', ToDoItemSchema);

module.exports = ToDoItem;