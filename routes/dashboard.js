var express = require('express');
var router = express.Router();

// Controllers
var project_controller = require('../controllers/projectController');
var item_controller = require('../controllers/itemController');

// Dashboard
router.get('/', (req, res) => {
    res.redirect('/dashboard/projects')
})

router.get('/projects', project_controller.index)

// Create project
router.post('/projects', project_controller.project_create, project_controller.index);

// Update project details
router.post('/projects/:projectId/update', project_controller.project_update, (req, res) => {
    res.redirect('/dashboard/projects/')
});

// Delete project
router.post('/projects/:projectId/delete', project_controller.project_delete, (req, res) => {
    res.redirect('/dashboard/projects/')
});

// Item routes

// List items in project
router.get('/projects/:projectId', item_controller.index)

// Create new item in project
router.post('/projects/:projectId', item_controller.item_create, item_controller.index);

// Display single to-do item
router.get('/projects/:projectId/:toDoItemId', item_controller.item_get);

// Update single to-do item
router.post('/projects/:projectId/:toDoItemId/update', item_controller.item_update,(req, res) => {
    res.redirect('/dashboard/projects/' + req.params.projectId + '/' + req.params.toDoItemId)
})

// Delete single to-do item
router.post('/projects/:projectId/:toDoItemId/delete', item_controller.item_delete, (req, res) => {
    res.redirect('/dashboard/projects/' + req.params.projectId)
});



// Replace single to-do item
/* router.put('/projects/:projectId/:toDoItemId', item_controller.item_replace, item_controller.index); */

/* router.patch('/projects/:projectId/:toDoItemId', item_controller.item_update) */

module.exports = router;