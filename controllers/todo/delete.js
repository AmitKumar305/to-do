const TodoModel = require('../../models/todo.models');

async function TodoDelete(req, res) {
    try {
        const { id, todoId } = req.body;

        if (!todoId) {
            return res.status(400).json({
                message: 'Missing required field todoId',
            })
        }
        const deletedTodo = await TodoModel.findOneAndDelete({
            _id: todoId,
            userId: id,
        });
        if (!deletedTodo) {
            return res.status(400).json({
                message: 'Todo not found'
            });
        }

        res.status(200).json({
            message: 'Todo deleted successfully.',
            data: {
                text: deletedTodo.text,
                todoId: deletedTodo._id,
            },
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error while deleting todo.'
        })
    }
}

module.exports = TodoDelete;