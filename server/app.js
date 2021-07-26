
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const productsRouter = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://oussema:oussema@cluster0.mgnqc.mongodb.net?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).catch(err => console.log(err));


app.use( (req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS'){
        req.header('Access-Control-Allow-Methods','*');
    }
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/products', productsRouter);
app.use('/orders', ordersRouter);


app.use((req, res, next) => {
    const error = new Error();
    error.status = 404;
    error.message = 'Failed to respong !!! Unknown';
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error : {
            message : error.message,
        }
    })
})





app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})