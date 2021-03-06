const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config('./env');

const users = require('./server/routes/api/users');
const notes = require('./server/routes/api/notes');
const labels = require('./server/routes/api/labels');

const app = express();

//BodyParser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./server/config/database').mongoURI;

//Connect to mongo
mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => console.log("MongooDB Connected...."))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/users',users);
app.use('/api/notes',notes);
app.use('/api/labels',labels);

const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`Server Started on port ${port}`));





