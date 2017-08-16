const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const router = require('./router')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/severauth00', { useMongoClient: true });

let app = express();

let port = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

router(app);


app.listen(port, () => {
    console.log('server is listening');
});