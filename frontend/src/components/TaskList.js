import React, { useEffect, useState } from 'react'
import Task from './Task'
import TaskForm from './TaskForm'
import axios from 'axios'
import { toast } from 'react-toastify'
import loader from '../assets/loader.webp'

const TaskList = () => {
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [taskId, setTaskId] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        completed: false
    })

    const { name } = formData

    const handleInputChange = e => {
        setFormData({ ...formData, name: e.target.value })

    }
    const handleCreateTask = async (e) => {
        e.preventDefault()
        if (name === "") {
            return toast.error("Input field cannot be empty!")
        }
        try {
            const { data } = await axios.post('/api/tasks', formData)
            if (data) {
                toast.success('Task added!')
                getTasks()
            }
            setFormData({ ...formData, name: '' })
        } catch (err) {
            toast.error(err.message)
        }
    }

    const getTasks = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get("/api/tasks")
            if (data) {
                setTasks(data)
                setLoading(false)
            }
        } catch (err) {
            toast.error(err.message)
            setLoading(false)
        }
    }

    const handleDeleteTask = async (id) => {
        setLoading(true)
        try {
            const { data } = await axios.delete(`/api/tasks/${id}`)
            if (data) {
                toast.success('Task deleted!')
                getTasks()
                setLoading(false)
            }
        } catch (err) {
            toast.error(err.message)
            setLoading(false)
        }
    }

    const getSingleTask = async (task) => {
        setFormData({ name: task.name, completed: false })
        setTaskId(task._id)
        setIsEditing(true)

    }

    const handleUpdateTask = async (e) => {
        e.preventDefault()
        if (name === "") {
            return toast.error("Input field cannot be empty!")
        }

        try {
            const { data } = await axios.put(`/api/tasks/${taskId}`, formData)
            if (data) {
                toast.success('Task updated!')
            }
            setFormData({ ...formData, name: "" })
            setIsEditing(false)
            getTasks()
        } catch (err) {
            toast.error(err.message)
        }
    }

    const handleTaskComplete = async (task) => {
        const newFormData = {
            name: task.name,
            completed: true
        }
        try {
            const { data } = await axios.put(`/api/tasks/${task._id}`, newFormData)
            if (data) {
                toast.success('Task completed!')
            }
            getTasks()
        } catch (err) {
            toast.error(err.message)
        }
    }


    useEffect(() => {
        getTasks()
    }, [])

    useEffect(() => {
        const completedTaskCount = tasks.filter(task => task.completed === true)
        setCompletedTasks(completedTaskCount)
    }, [tasks])


    return (
        <div>
            <h2>Task Manager</h2>
            <TaskForm
                handleInputChange={handleInputChange}
                name={name}
                handleCreateTask={handleCreateTask}
                isEditing={isEditing}
                handleUpdateTask={handleUpdateTask} />
            {tasks.length > 0 &&
                <div className="--flex-between --pb">
                    <p><b>Total Tasks: </b>{tasks.length}</p>
                    <p><b>Completed Tasks: </b>{completedTasks.length}</p>
                </div>}
            <hr />
            {
                loading ? (
                    <div className="--flex-center">
                        <img height={200} width={200} src={loader} alt="Loading" />
                    </div>
                )
                    :
                    !loading && tasks === 0 ? (
                        <p className='--py'>Not task to show! Maybe add some?</p>
                    ) : (
                        <>
                            {tasks.map((task, index) =>
                                <Task
                                    key={task._id}
                                    index={index}
                                    task={task}
                                    handleDeleteTask={handleDeleteTask}
                                    getSingleTask={getSingleTask}
                                    handleTaskComplete={handleTaskComplete}
                                />
                            )}
                        </>
                    )
            }

        </div>
    )
}

export default TaskList