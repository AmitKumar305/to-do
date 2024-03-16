const { Router } = require('express');
const Authenticate = require('../middleware/authenticate');
const AddTodo = require('../controllers/todo/add');
const UpdateTodo = require('../controllers/todo/update');
const ListTodo = require('../controllers/todo/list');
const DeleteTodo = require('../controllers/todo/delete');

const TodoRoute = Router();

TodoRoute.post('/add', Authenticate, (req, res) => {
    AddTodo(req,res);
});
TodoRoute.post('/update', Authenticate, (req, res) => {
    UpdateTodo(req,res);
});
TodoRoute.post('/list', Authenticate, (req, res) => {
    ListTodo(req,res);
});
TodoRoute.post('/delete', Authenticate, (req, res) => {
    DeleteTodo(req,res);
});

module.exports = TodoRoute;