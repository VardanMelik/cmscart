const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// This app
const app = express();

// Connect to db
mongoose.connect('mongodb://localhost:27017/cmscart', {
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


app.get('/', (req, res) => {
    res.send('Server is working');
})