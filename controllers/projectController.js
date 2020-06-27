var Project = require('../models/Project')
var ToDoItem = require('../models/ToDoItem')
var async = require('async')

// List projects
exports.index = function(req, res) {
    // Sort
    const sort = {}
    if (req.query.sortBy && req.query.orderBy) {
        sort[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1;
    }
    
    Project.find({user: req.user.id}, function(err, projects) {
        res.render('layout', {
            loggedIn: true,
            projects: projects, 
            layout: 'projects'
        })
    }).sort(sort).populate('toDoItems')
}

// Handle project create
exports.project_create = async function(req, res, next) {
    let project = new Project({
        name: req.body.name,
        user: req.user.id,
        dateCreated: new Date(),
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
exports.project_delete = async function(req, res, next) {
    async.parallel([
        function(callback) {
            Project.deleteOne({_id: req.params.projectId}, (err) => {
                if (err) return res.send(err);
                callback();
            })
        },
        function(callback) {
            ToDoItem.deleteMany({project: req.params.projectId}, (err) => {
                if (err) return res.send(err);
                callback();
            })
        },
    ], function(err) {
        next();
    })
    

}