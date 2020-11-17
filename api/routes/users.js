const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /users!'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /users!'
    });
});

router.get('/:userID', (req, res, next) => {
    const id = req.params.userID;
    if(id === 'admin') {
        res.status(200).json({
            message: 'You have admin privileges',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'Normal user',
            id: id
        });
    };
});

router.post('/userID', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST for user'
    });
});

router.patch('/:userID', (req, res, next) => {
    const id = req.params.userID;
    res.status(200).json({
        message: 'Updated user'
    });
});

router.delete('/:userID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted user'
    });
});

module.exports = router;