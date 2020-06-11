var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment')
var ToDoItem = require('./ToDoItem')

var ProjectSchema = new Schema({
    name: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

ProjectSchema.virtual('url').get(function () {
    return '/dashboard/projects/' + this._id;
});

ProjectSchema.virtual('count').get(function () {
    console.log(this._id)
    ToDoItem.countDocuments({project: this._id}, function(err, count) {
        return count;
    })
});


ProjectSchema.virtual('dateCreatedFormatted').get( function() {
    return moment(this.dateCreated).fromNow();
})


var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;