const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const manageRoutes = require('./routes/manageRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

//Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use('/manage', manageRoutes);
app.use('/profile', profileRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(result => {
        app.listen(process.env.PORT,() => {
            console.log('Listening on port 4000\nConnected to DB')
        })
    })
    .catch(err => console.log(err))

app.use(express.static('../public'));