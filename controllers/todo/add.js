const UserModel = require('../../models/user.models');
const TodoModel = require('../../models/todo.models');

async function TodoAdd(req, res) {
    try {
        const { id, text } = req.body;

        if (!text) {
            return res.status(400).json({
                message: 'Missing required fields',
            })
        }

        const user = await UserModel.findOne({
            _id: id,
        });
        if (!user) {
            return res.status(400).json({
                message: 'Account not found'
            });
        }

        const todo = new TodoModel({
            userId: user._id,
            text,
        });
        await todo.save();
        res.status(200).json({
            message: 'Todo added successfully',
            data: {
                todoId: todo._id,
                text: todo.text,
                userId: user._id,
            },
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error while adding todo'
        })
    }
}

module.exports = TodoAdd;