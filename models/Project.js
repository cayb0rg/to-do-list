var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    toDoItems: [{type: Schema.Types.ObjectId, ref:'ToDoItem'}],
})


var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;