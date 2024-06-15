const ToDoItem = require('../models/ToDoItem')
const Project = require('../models/Project')
const async = require('async');

// Display to do items in list, display projects in nav
exports.index = async function(req, res) {
    try {
        // Get current project details
        const [currentProject, projects, items] = await Promise.all([
            Project.findById(req.params.projectId).lean(),
            Project.find({ user: req.user.id }).lean(),
            ToDoItem.find({ project: req.params.projectId })
                    .sort(req.query.sortBy ? { [req.query.sortBy]: req.query.orderBy === 'desc' ? -1 : 1 } : {})
                    .populate('project')
        ]);

        res.render('layout', {
            loggedIn: true,
            layout: 'todoitems',
            projects: projects,
            toDoItems: items,
            selected_project_name: currentProject.name,
            selected_project: req.params.projectId
        });
    } catch (err) {
        res.send(err);
    }
}

// Display item in details panel, display to do items in list, display projects in nav
exports.item_get = async function(req, res) {
    try {
        const [currentProject, projects, items, selectedItem] = await Promise.all([
            Project.findById(req.params.projectId).lean(),
            Project.find({ user: req.user.id }),
            ToDoItem.find({ project: req.params.projectId }).populate('project'),
            ToDoItem.findById(req.params.toDoItemId).populate('project')
        ]);

        res.render('layout', {
            loggedIn: true,
            layout: 'todoitems',
            projects: projects,
            toDoItems: items,
            selected_item: selectedItem,
            selected_project_name: currentProject.name,
            selected_project: req.params.projectId
        });
    } catch (err) {
        res.send(err);
    }
}

// Handle item create
exports.item_create = async function(req, res, next) {
    try {
        let completionDate = req.body.completed ? new Date() : null;

        const item = new ToDoItem({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            dateCreated: new Date(),
            completed: req.body.completed,
            dateCompleted: completionDate,
            project: req.params.projectId
        });

        const project = await Project.findById(item.project);
        project.toDoItems.push(item);

        await Promise.all([item.save(), project.save()]);

        res.status(201);
        next();
    } catch (err) {
        res.send(err);
    }
}

// Patch item
exports.item_update = async function(req, res, next) {
    try {
        let updateFields = { ...req.body };
        if (req.body.completed)
            updateFields.dateCompleted = new Date();

        await ToDoItem.findByIdAndUpdate(req.params.toDoItemId, updateFields);

        res.status(201);
        next();
    } catch (err) {
        res.send(err);
    }
}

// Delete item
exports.item_delete = async function(req, res, next) {
    try {
        await ToDoItem.deleteOne({_id: req.params.toDoItemId}).catch(err => {
            if (err) return res.send(err);
        })
        next();
    }
    catch(err) {
        res.send(err);
    }
}