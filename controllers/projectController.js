var Project = require('../models/Project')
var ToDoItem = require('../models/ToDoItem')
var async = require('async')

// List projects
exports.index = function(req, res) {
    Project.find({user: req.user.id}, function(err, projects) {
        res.render('layout', {
            projects: projects, 
            layout: 'projects'
        })
    }).populate('toDoItems')
}

// Handle project create
exports.project_create = async function(req, res, next) {
    let project = new Project({
        name: req.body.name,
        user: req.user.id,
    })

    await project.save((err) => {
        if (err) return res.send(err);
    })

    next();
}

// Handle project update
exports.project_update = function(req, res) {
    Project.findById(req.params.projectId, (err, project) => {
        if (err) return res.send(err);
        project.set(req.body);
        project.save((err) => {
            if (err) return res.send(err);
            res.status(201);
            next();
        })
    });
}

// Delete project
exports.project_delete = function(req, res, next) {
    Project.deleteOne({_id: req.params.projectId}, (err) => {
        if (err) return res.send(err);
    })
    next();
}