const { Router } = require('express');
const Authenticate = require('../middleware/authenticate');
const Signup = require('../controllers/user/signup');
const Login = require('../controllers/user/login');

const UserRoute = Router();

UserRoute.post('/signup', (req, res) => {
    Signup(req,res);
});
UserRoute.post('/login', (req, res) => {
    Login(req,res);
});

module.exports = UserRoute;