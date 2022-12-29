const task = require('../models/taskModel')

const createTask = async (req, res) => {
    try {
        const tTask = await task.create(req.body)
        res.status(200).send(tTask)
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await task.find()
        res.status(200).send(tasks)
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const singleTask = await task.findById(id);
        if (!singleTask) {
            return res.status(404).json(`No task was found with id ${id}.`)
        }
        res.status(200).send(singleTask)
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await task.findByIdAndDelete(id);
        if (!result) {
            res.status(404).json(`No task with id ${id} was found.`)
        }
        res.status(200).send('Task Deleted!')
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await task.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true,
        })
        if (!result) {
            return res.status(404).json(`No task with id ${id} was found.`)
        }
        res.status(200).send(result)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask,
}