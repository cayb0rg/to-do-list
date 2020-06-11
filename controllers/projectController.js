var Project = require('../models/Project')
var ToDoItem = require('../models/ToDoItem')
var async = require('async')

// List projects
exports.index = function(req, res) {
    Project.find({user: req.user.id}, function(err, projects) {
        res.render('layout', {
            projects: projects, layout: 'projects'
        })
    })
}

// Handle project create
exports.project_create = function(req, res, next) {
    let project = new Project({
        name: req.body.name,
        user: req.user.id,
    })

    project.save((err) => {
        if (err) return res.send(err);
    })

    next();
}

// Handle project update
exports.project_update = function(req, res) {

}

// Delete project
exports.project_delete = function(req, res) {
    
}