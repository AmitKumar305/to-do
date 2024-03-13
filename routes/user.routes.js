const { Router } = require('express');
const Signup = require('../controllers/user/signup');

const UserRoute = Router();

UserRoute.post('/signup', (req, res) => {
    Signup(req,res);
});

module.exports = UserRoute;