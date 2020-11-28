const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Weight_track = require('../models/weight_track_model');

router.get('/', (req, res, next) => {
    Weight_track.find()
        .select('-__v')
        .exec()
        .then(docs => {
            const response = {
               count: docs.length,
               weights: docs.map(doc => {
                   return {
                       weight: doc,
                       request: {
                           type: 'GET',
                           url: 'http://localhost:3000/weight_track' + doc._id
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

// When creating a new post, only initial and goal weight is recorded
router.post('/', (req, res, next) => {
    const weight_track = new Weight_track({
        _id: new mongoose.Types.ObjectId(),
        initial: req.body.initial,
        goal: req.body.goal
    });
    weight_track
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Initial weight and goal weight saved!',
                createdWeight_track: {
                    initial: result.initial,
                    goal: result.goal
                },
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/weight_track'
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

router.get('/:weight_trackID', (req, res, next) => {
    const id = req.params.weight_trackID;
    Weight_track.findById(id)
        .select('-__v')
        .exec()
        .then(doc => {
            res.status(200).json({
                weight_track: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/weight_track'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({erro: err});
        });
});

// This is where user can edit their current weight
router.patch('/:weight_trackID', (req, res, next) => {
    const id = req.params.weight_trackID;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    };
    Weight_track.updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Weight has been updated',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/weight_track' + id
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

router.delete('/:weight_trackID', (req, res, next) => {
    const id = req.params.weight_trackID;
    Weight_track.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Weight record deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/weight_track',
                    body: { initial: 'Number', goal: 'Number'}
                }
            });
        })
        .catch();
});

module.exports = router;