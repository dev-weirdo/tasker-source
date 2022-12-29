import React from 'react'
import { FaRegEdit, FaCheck, FaTrash } from 'react-icons/fa'

const Task = ({ index, task, handleDeleteTask, getSingleTask, handleTaskComplete }) => {
    return (
        <div className={task.completed ? "task completed" : "task"}>
            <p>
                <b>{index}. </b>
                {task.name}
            </p>
            <div className="task-icons">
                <FaCheck color='green' onClick={() => handleTaskComplete(task)} />
                <FaRegEdit color='orange' onClick={() => getSingleTask(task)} />
                <FaTrash color='red' onClick={() => handleDeleteTask(task._id)} />
            </div>
        </div>
    )
}

export default Task