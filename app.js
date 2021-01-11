const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/db');
const router = require('./routes/pages');
const bodyParser = require('body-parser');
const session = require('express-session');
const  expressValidator = require('express-validator');

// This app
const app = express();


// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Express Session middleware
app.set('trust proxy', 1); // trust first proxy
app.use( session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true}
}));

// Express Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// Connect to db
mongoose.connect(config.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
})



// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`Server is running: ${port} `);
});


// Set routes
const pages = require('./routes/pages');
app.use('/', pages);

const adminPages = require('./routes/adminPages');
app.use('/admin', adminPages);