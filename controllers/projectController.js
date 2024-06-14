var Project = require('../models/Project')
var ToDoItem = require('../models/ToDoItem')
var async = require('async')

// List projects
exports.index = async function(req, res) {
    // Sort
    const sort = {};
    if (req.query.sortBy && req.query.orderBy) {
        sort[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1;
    }

    try {
        const projects = await Project.find({ user: req.user.id }).sort(sort).populate('toDoItems');

        res.render('layout', {
            loggedIn: true,
            projects: projects,
            layout: 'projects'
        });
    } catch (err) {
        res.send(err);
    }
}

// Handle project create
exports.project_create = async function(req, res, next) {
    const project = new Project({
        name: req.body.name,
        user: req.user.id,
        dateCreated: new Date(),
    });

    try {
        await project.save();
        next();
    } catch (err) {
        res.send(err);
    }
}

// Handle project update
exports.project_update = async function(req, res) {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true });
        res.status(201).send(updatedProject);
    } catch (err) {
        res.send(err);
    }
}

// Delete project
exports.project_delete = async function(req, res, next) {
    try {
        await Project.deleteOne({ _id: req.params.projectId });
        await ToDoItem.deleteMany({ project: req.params.projectId });
        next();
    } catch (err) {
        res.send(err);
    }
}