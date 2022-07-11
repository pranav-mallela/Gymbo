const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const manageRoutes = require('./routes/manageRoutes');
const profileRoutes = require('./routes/profileRoutes');
const machineRoutes = require('./routes/machineRoutes');

const app = express();

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('../build'));
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../build/index.html'));
    });
   }

//Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/manage', manageRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/machines', machineRoutes);
mongoose.connect(process.env.MONGO_URI)
    .then(result => {
        app.listen(process.env.PORT,() => {
            console.log('Listening on port 4000\nConnected to DB')
        })
    })
    .catch(err => console.log(err))