const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');
const clsfd = require('./classified');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');
// const _ = require('lodash');


// Initializing Express and View Engine (EJS)
const app = express();
app.set('view engine', 'ejs');


// Connect to MongoDB using Mongoose and Listening for Requests
const PORT = process.env.PORT || 3000;
mongoose.connect(clsfd.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result)  => { 
        console.log('connected to DB')
        app.listen(PORT, 'localhost', () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => console.log(err));


// Middleware/Static Files
app.use(express.static('public'));//Setting up Static Files
app.use(express.json());//Auth for req.body
app.use(express.urlencoded({ extended: true }));//Accepting Form Data
app.use(morgan('dev'));
app.use(cookieParser());
app.use(checkUser);
// app.get('*', checkUser); // Same as Above


// Routes
app.use(userRoutes);
app.use('/comments', commentRoutes);
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));


// Redirects
app.get('/about-us', (req, res) => res.redirect('/about'));


// 404 Page
app.use((req, res) => res.status(404).render('404'));
