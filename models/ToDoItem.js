var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const moment = require('moment');


var ToDoItemSchema = new Schema({
    description: String,
    dueDate: Date,
    priority: Number,
    dateCreated: Date,
    completed: Boolean,
    project: {type: Schema.Types.ObjectId, ref: 'Project'}
})

ToDoItemSchema.set('toObject', { virtuals: true })
ToDoItemSchema.set('toJSON', { virtuals: true })

ToDoItemSchema.virtual('url').get(function() {
    return '/dashboard/projects/' + this.project._id + '/' + this._id;
})

ToDoItemSchema.virtual('dueDateFormatted').get(function() {
    return moment(this.dueDate).fromNow();
})

ToDoItemSchema.virtual('dueDateStandard').get(function() {
    return moment(this.dueDate).utc().format('YYYY-MM-DD');
})

ToDoItemSchema.virtual('dateCreatedFormatted').get( function() {
    return moment(this.dateCreated).fromNow();
})

var ToDoItem = mongoose.model('ToDoItem', ToDoItemSchema);

module.exports = ToDoItem;