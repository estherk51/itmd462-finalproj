const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Exercise = require('../models/exercise_model');
const User = require('../models/user_model');

const exerciseURL = 'http://localhost:3000/exercise/';

router.get('/', (req, res, next) => {
    Exercise.find()
        .select('-__v')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                exercises: docs.map(doc => {
                    return {
                        exercise: doc,
                        request: {
                            type: 'GET',
                            url: exerciseURL + doc._id
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
    User.findById(req.body.userID)
        .then(user => {
            if(!user) {
                return res.status(404).json({
                    message: 'User not found'
                })
            } else {
                const exercise = new Exercise({
                    _id: new mongoose.Types.ObjectId(),
                    userID: req.body.userID,
                    name: req.body.name,
                    duration: req.body.duration,
                    reps: req.body.reps,
                    date: req.body.date
                });
                return exercise.save();
            }
        })
        .then(result => {
            res.status(201).json({
                message: 'Exercise successfully saved',
                createdExercise: {
                    userID: result.userID,
                    name: result.name,
                    duration: result.duration,
                    reps: result.reps,
                    date: result.date
                },
                request: {
                    type: 'GET',
                    url: exerciseURL + result._id
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

router.get('/:exerciseID', (req, res, next) => {
    const id = req.params.exerciseID;
    Exercise.findById(id)
        .select('-__v')
        .exec()
        .then(doc => {
            res.status(200).json({
                exercise: doc,
                request: {
                    type: 'GET',
                    url: exerciseURL
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:exerciseID', (req, res, next) => {
    const id = req.params.exerciseID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    };
    Exercise.updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Exercise updated',
                request: {
                    type: 'GET',
                    url: exerciseURL + id
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

router.delete('/:exerciseID', (req, res, next) => {
    const id = req.params.exerciseID;
    Exercise.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Exercise deleted',
                request: {
                    type: 'POST',
                    url: exerciseURL,
                    body: { name: 'String', date: 'String'}
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