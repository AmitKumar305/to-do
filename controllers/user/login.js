const UserModel = require('../../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function UserLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Missing required fields',
            })
        }

        const user = await UserModel.findOne({
            email,
        });
        if (!user) {
            return res.status(400).json({
                message: 'Account not found'
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Wrong password'
            });
        }
        const jwtToken = await jwt.sign({
            id: user._id,
            email: user.email,
        }, process.env.SECRET_STRING, {
            expiresIn: '100d',
        });

        res.status(200).json({
            message: 'User logged in successfully',
            data: {
                accessToken: jwtToken,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
            },
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error while login'
        })
    }
}

module.exports = UserLogin;