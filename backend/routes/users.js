const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/sign-up', (req, res) => {
    const data = req.body.password;
    const saltRounds = 10;

    bcrypt.hash(data, saltRounds)
    .then(hash => {

        const user = new User({email: req.body.email, password: hash});

        return user.save();
    })
    .then(response => {

        res.status(201).json({
            message: "User successfully created!"
        })
    })
    .catch(err => {

        res.status(401).json({
            message: 'Auth Failed!'
        })
    })

})


router.post('/log-in', (req, res) => {
    let fetchedUser = undefined;

    User.findOne({email: req.body.email})
    .then(user => {
        if(!user)
            res.status(401).json({
                message: 'Auth Failed!'

            })
            
        fetchedUser = user;

        return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
        if(!result)
            res.status(401).json({
                message: 'Auth Failed!'

            })
        
        const payload = {
            email: fetchedUser.email,
            id: fetchedUser._id

        }
        const secretKey = 'Secret_payload_signature_seed'

        const token = jwt.sign(payload, secretKey);

        res.status(200).json({
            message: 'Auth passed!',
            token: token,
            expiresIn: 3600
            
        })
    })

})

module.exports = router;