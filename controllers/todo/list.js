const TodoModel = require('../../models/todo.models');

async function TodoList(req, res) {
    try {
        const { id, page = 1, limit = 10 } = req.body;

        const todos = await TodoModel.find({
            userId: id,
        })
        .skip((page-1) * limit)
        .limit(limit)
        .select('-__v')

        res.status(200).json({
            message: 'Todos fetched successfully',
            data: todos,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error while fetching todo'
        })
    }
}

module.exports = TodoList;