const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const mongoose = require('mongoose');


router.get('/', (req, res, next) => {
    Product.find()
        .then(
            docs => {
                res.status(200).json(docs)
            }
        )
        .catch(
            err => res.json({error : err})
        )
})


router.get('/:id', (req, res, next) => {
    const id = req.params.id.toLowerCase();
    Product.findById(id)
        .then(
            docs => {
                res.status(200).json({
                    res : docs,
                    message : 'ById',
                })
            }
        )
        .catch(
            err => res.json({error : err})
        )
})


router.post('/', (req, res, next) => {
    
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    })
    product.save().then(
        result => {
            console.log(result);
            res.status(201).json(product);
        }
    );
})

module.exports = router;