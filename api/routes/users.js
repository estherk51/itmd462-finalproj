const express = require('express');
const mongoose = require('mongoose');
const { restart } = require('nodemon');
const router = express.Router();

const User = require('../models/user_model');

router.get('/', (req, res, next) => {
    User.find()
        .select('-__v')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        user: doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/users' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.email
    });
    user
        .save()
        .then(result => {
            res.status(200).json({
                message: 'User account saved!',
                createdUser: {
                    name: result.name,
                    username: result.username,
                    email: result.email,
                    password: result.password
                },
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/users'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:userID', (req, res, next) => {
    const id = req.params.userID;
    User.findById(id)
        .select('-__v')
        .exec()
        .then(doc => {
            res.status(200).json({
                user: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/users'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:userID', (req, res, next) => {
    const id = req.params.userID;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    };
    User.updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User has been updated',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/users' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userID', (req, res, next) => {
    const id = req.params.userID;
    User.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Account has been deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/users',
                    body: {
                        name: 'String', 
                        username: 'String',
                        email: 'String',
                        password: 'String'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;