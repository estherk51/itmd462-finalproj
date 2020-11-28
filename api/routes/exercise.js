const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Exercise = require('../models/exercise_model');

router.get('/', (req, res, next) => {
    Exercise.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                exercises: docs.map(doc => {
                    return {
                        exercise: doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/exercise/' + doc._id
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
    const exercise = new Exercise({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        duration: req.body.duration,
        reps: req.body.reps,
        date: req.body.date
    });
    exercise
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Exercise successfully saved',
                createdExercise: {
                    name: result.name,
                    duration: result.duration,
                    reps: result.reps,
                    date: result.date
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/exercise'
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
        .exec()
        .then(doc => {
            res.status(200).json({
                exercise: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/exercise'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
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
                    url: 'http://localhost:3000/exercise' + id
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
                    url: 'http://localhost:3000/exercise',
                    body: { name: 'String', date: 'String'}
                }
            });
        })
        .catch();
});

module.exports = router;