const ToDoItem = require('../models/ToDoItem')
const Project = require('../models/Project')
const async = require('async');
var projectController = require('./projectController')

// Display to do items in list, display projects in nav
exports.index = function(req, res) {
    async.parallel({
        projects: function(callback) {
            Project.find({user: req.user.id}, callback)
        },
        items: function(callback) {
            // Sort
            const sort = {}
            if (req.query.sortBy && req.query.orderBy) {
                sort[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1;
            }
            ToDoItem.find({project: req.params.projectId}, callback).sort(sort).populate('project');
        },
        selected_project: function(callback) {
            callback(null, req.params.projectId);
        }
    }, function(err, results) {
        res.render('layout', {
            layout: 'todoitems', 
            projects: results.projects, 
            toDoItems: results.items,
            selected_project: results.selected_project
        })
    })    
}

// Display item in details panel, display to do items in list, display projects in nav
exports.item_get = function(req, res) {
    async.parallel({
        projects: function(callback) {
            Project.find({user: req.user.id}, callback)
        },
        items: function(callback) {
            ToDoItem.find({project: req.params.projectId}, callback).populate('project');
        },
        selected_item: function(callback) {
            ToDoItem.findById(req.params.toDoItemId, callback).populate('project');
        },
        selected_project: function(callback) {
            callback(null, req.params.projectId);
        }
    }, function(err, results) {
        res.render('layout', {
            layout: 'todoitems', 
            projects: results.projects, 
            toDoItems: results.items,
            selected_item: results.selected_item,
            selected_project: results.selected_project})
    })
}

// Handle item create
exports.item_create = async function(req, res, next) {
    var completionDate;
    if (req.body.completed)
        completionDate = new Date();
    else
        completionDate = null;
    
    let item = new ToDoItem({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        dateCreated: new Date(),
        completed: req.body.completed,
        dateCompleted: completionDate,
        project: req.params.projectId
    })
    Project.findById(item.project, (err, project) => {
        project.toDoItems.push(item);
        project.save();
    })
    await item.save(function(err, item) {
        if (err) return res.send(err);
    })
    res.status(201);
    next();
}

// Patch item
exports.item_update = function(req, res, next) {
    ToDoItem.findById(req.params.toDoItemId, (err, item) => {
        if (err) return res.send(err);
        if (req.body.completed)
            req.body.dateCompleted = new Date();
        item.set(req.body);
        item.save((err) => {
            if (err) return res.send(err);
            res.status(201);
            next();
        })
    });
}

// Delete item
exports.item_delete = function(req, res, next) {
    ToDoItem.deleteOne({_id: req.params.toDoItemId}, function(err) {
        if (err) return res.send(err);
    })
    next();
}