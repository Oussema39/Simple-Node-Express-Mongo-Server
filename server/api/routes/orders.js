const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json(
        { message: 'Get req works on /orders'}
    )
})

router.post('/', (req, res, next) => {
    const order = {}

    res.status(200).json(
        { message: 'Post req works on /orders'}
    )
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    (id.toLowerCase() === 'oussema') ?
    res.status(201).json(
        { message: 'in orders : You are oussema'}
    )
    :
    res.status(201).json(
        { message: `in orders Try again ${id}` }
    );
})




module.exports = router;