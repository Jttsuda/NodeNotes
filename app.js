const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const commentRoutes = require('./routes/commentRoutes');
const dburi = require('./dbURI');
// const http = require('http');
// const fs = require('fs');
// const _ = require('lodash');


// Initializing Express and View Engine (EJS)
const app = express();
app.set('view engine', 'ejs');


// Connect to MongoDB using Mongoose and Listening for Requests
const PORT = process.env.PORT || 3000;
const dbURI = dburi;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result)  => { 
        console.log('connected to DB')
        app.listen(PORT, 'localhost', () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => console.log(err));


// Middleware & Static Files
app.use(express.static('public'));//Setting up Static Files
app.use(express.urlencoded({ extended: true }));//Accepting Form Data
app.use(morgan('dev'));


// Comment Routes
app.use('/comments', commentRoutes);


// Main Routes
app.get('/', (req, res) => {
    const things = [
        { test: "This" },
        { test: "is" },
        { test: "a" },
        { test: "list" }
    ]
    res.render('index', { name: 'Suda', things });
});

app.get('/about', (req, res) => {
    res.render('about');
});


// Redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


// 404 Page
app.use((req, res) => {
    res.status(404).render('404');
});
