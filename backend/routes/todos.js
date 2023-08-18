const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

router.post('/create-todo', checkAuth, (req, res) => {
    const todo = new Todo({ todo: req.body.todo, checked: false, creator: req.decodedToken.id });

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
    Todo.find({ creator: req.decodedToken.id })
    .then(documents => {
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
    Todo.updateOne(
        { _id: req.query.id, creator: req.decodedToken.id }, 
        {checked: req.body.checked, _id: req.body.todoItem.id}
        )
    .then(document => {
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
    Todo.deleteOne({ _id: req.query.id, creator: req.decodedToken.id })
    .then(result => {
        if(result.deletedCount) {
            res.status(202).json({
                message: 'Successfully deleted todo!'
    
            }) 

        } else {
            res.status(401).json({ message: 'Not Authorized!' });

        }

    })


})


module.exports = router;