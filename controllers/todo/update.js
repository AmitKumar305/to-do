const UserModel = require('../../models/user.models');
const TodoModel = require('../../models/todo.models');

async function TodoUpdate(req, res) {
    try {
        const { id, text, todoId } = req.body;

        if (!text || !todoId) {
            return res.status(400).json({
                message: 'Missing required fields',
            })
        }

        const updatedTodo = await TodoModel.findOneAndUpdate({
            _id: todoId,
            userId: id,
        }, {
            text,
        }, {
            new: true,
        });
        if (!updatedTodo) {
            return res.status(400).json({
                message: 'Todo not found',
            })
        }

        res.status(200).json({
            message: 'Todo updated successfully',
            data: {
                userId: id,
                text: updatedTodo.text,
                todoId: updatedTodo._id,
            },
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error while updating todo'
        })
    }
}

module.exports = TodoUpdate;