const express = require('express');

const router = express.Router();

const MustBeLoggedIn = require('../middleware/MustBeLoggedIn');

const TaskController = require('../controllers/TaskController');

router.get('/tasks', [MustBeLoggedIn], new TaskController().index);
router.post('/tasks', [MustBeLoggedIn], new TaskController().store);
router.delete('/tasks/:id', [MustBeLoggedIn], new TaskController().destroy);
router.patch('/tasks/:id', [MustBeLoggedIn], new TaskController().update);

module.exports = router;
