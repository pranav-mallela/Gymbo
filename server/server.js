const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const dbURI = 'mongodb+srv://pranav_mallela:Collins%23600@gymbodb.e0c5fpe.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err))

app.use(express.static('../public'));

app.use(morgan('dev'));