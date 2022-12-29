//Import modules
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose')
const cors = require('cors')
// const connectDB = require('./config/connectDB')
const taskRoutes = require('./routes/taskRoute')
const PORT = process.env.PORT || 10101;

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api/tasks', taskRoutes)

//Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`)
        })
    )
    .catch((err) => console.log(err))





//First method to connect DB

// const startServer = async () => {
//     try {
//         await connectDB();
//         app.listen(PORT, () => {
//             console.log(`Server running on port: ${PORT}`)
//         })
//     }catch(err) {
//         console.log(err);
//     }
// }

// startServer()
