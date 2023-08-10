const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const todoRouter = require('./routes/todos');
const userRouter = require('./routes/users');

const app = express();
mongoose.connect('mongodb+srv://Siraj--Ansari:BOZrUHBcjxiCvlJZ@cluster0.xbctr6i.mongodb.net/todos-angular?retryWrites=true&w=majority')
.then(() => {

    console.log('Database connected successfully!');
})
.catch(err => {
    
    console.log('error: ', err)
})


app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/todos', todoRouter);

module.exports = app;