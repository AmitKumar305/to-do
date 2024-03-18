const mongoose = require('mongoose')
const TodoModel = require('../../models/todo.models');

async function TodoList(req, res) {
    try {
        const { id, page = 1, limit = 10 } = req.body;

        const todos = await TodoModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(id),
                }
            },
            {
                $project: {
                    _id: 0,
                    todoId: '$_id',
                    text: '$text',
                    userId: '$userId',
                    createdAt: '$createdAt',
                    updatedAt: '$updatedAt',
                }
            },
            {
                $skip: (page-1)*limit,
            },
            {
                $limit: limit,
            },
        ]);

        res.status(200).json({
            message: 'Todos fetched successfully',
            data: todos,
        })
    } catch (err) {
        console.log(err``);
        res.status(500).json({
            message: 'Error while fetching todo'
        })
    }
}

module.exports = TodoList;