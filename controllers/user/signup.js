const UserModel = require('../../models/user.models');
const bcrypt = require('bcrypt');
const uploadOnCloudinary = require('../../services/cloduinary.service');

async function UserSignup(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Missing required fields',
            })
        }

        const existingEmail = await UserModel.findOne({
            email,
        });
        if (existingEmail) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const uploadedFile = await uploadOnCloudinary(req.files?.profilePicture?.data);
        const user = new UserModel({
            name,
            email,
            password: hashedPassword,
            profilePicture: uploadedFile?.url,
        });
        await user.save();

        res.status(200).json({
            message: 'User signed up successfully',
            data: user,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error while signup'
        })
    }
}

module.exports = UserSignup;