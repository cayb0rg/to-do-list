var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment')
var ToDoItem = require('./ToDoItem')

var ProjectSchema = new Schema({
    name: String,
    toDoItems: [{type: Schema.Types.ObjectId, ref: 'ToDoItem'}],
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

ProjectSchema.virtual('url').get(function () {
    return '/dashboard/projects/' + this._id;
});

ProjectSchema.virtual('dateCreatedFormatted').get( function() {
    return moment(this.dateCreated).fromNow();
})

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;