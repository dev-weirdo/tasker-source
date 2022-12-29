import React from 'react'

const TaskForm = ({ handleCreateTask, name, handleInputChange, isEditing, handleUpdateTask }) => {
    return (
        <form onSubmit={isEditing ? handleUpdateTask : handleCreateTask} className='task-form'>
            <input
                type="text"
                placeholder='Add a Task'
                name='name'
                value={name}
                onChange={handleInputChange} />
            <button type='submit'>{isEditing ? 'Edit' : 'Add'}</button>
        </form>
    )
}

export default TaskForm