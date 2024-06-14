var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const moment = require('moment');


var ToDoItemSchema = new Schema({
    title: String,
    description: String,
    dueDate: Date,
    priority: Number,
    dateCreated: Date,
    completed: Boolean,
    dateCompleted: Date,
    project: {type: Schema.Types.ObjectId, ref: 'Project'}
})

ToDoItemSchema.set('toObject', { virtuals: true })
ToDoItemSchema.set('toJSON', { virtuals: true })

ToDoItemSchema.virtual('url').get(function() {
    return '/dashboard/projects/' + this.project._id + '/' + this._id;
})

ToDoItemSchema.virtual('dueDateFormatted').get(function() {
    if (this.dueDate)
        return moment(this.dueDate).fromNow();
    else
        return 'Never';
})

ToDoItemSchema.virtual('dueDateStandard').get(function() {
    if (this.dueDate)
        return moment(this.dueDate).utc().format('YYYY-MM-DD');
    else
        return 'Never';
})

ToDoItemSchema.virtual('dateCreatedFormatted').get( function() {
    return moment(this.dateCreated).fromNow();
})

ToDoItemSchema.virtual('dateCompletedFormatted').get( function() {
    return moment(this.dateCompleted).fromNow();
})

ToDoItemSchema.virtual('overDue').get(function() {
    if (this.dueDate)
        return this.dueDate < new Date();
    else
        return false;
})

var ToDoItem = mongoose.model('ToDoItem', ToDoItemSchema);

module.exports = ToDoItem;