const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

router.post('/create-todo', checkAuth, (req, res) => {
    
    const todo = new Todo({todo: req.body.todo, checked: false});
    console.log(req.headers.authorization)

    todo.save()
    .then(document => {

        res.status(201).json({
            message: 'Successfully posted the todo!',
            todo: document
        })
    })
    .catch(err => {

        console.log('Error: ', err.message);
    })
})

router.get('/get-todos', checkAuth, (req, res) => {

    Todo.find()
    .then( documents => {

            res.status(200).json({
                message: 'successfullt fetched todos!',
                todos: documents
            })
        }
    )
    .catch(err => {

        console.log('Error', err.message);
    })
})

router.put('/todo-check', checkAuth, (req, res) => {

    Todo.updateOne({_id: req.query.id}, {checked: req.body.checked, _id: req.body.todoItem.id})
    .then(document => {

        console.log('todo: ', document)
        
        res.status(200).json({
            message: 'Successfully edited the todo!',
            todo: document
        });
    })
    .catch(err => {

        console.log('Error: ', err.message);
    })


})

router.delete('/todo-delete', checkAuth, (req , res) => {
    console.log('headers: ', req.headers.authorization)

    Todo.deleteOne({ _id: req.query.id })
    .then(result => {
        
        res.status(202).json({
            message: 'Successfully deleted todo!'

        }) 
    })


})


module.exports = router;