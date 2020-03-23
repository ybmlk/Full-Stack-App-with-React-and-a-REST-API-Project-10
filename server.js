// Import Modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

// Import routes
const courses = require('./routes/courses');
const users = require('./routes/users');

// Create Express app
const app = express();

// Setup morgan which gives us http request logging
app.use(morgan('dev'));

// Bodyparser middleware
app.use(express.json());

// DB config (mongoURI)
const db = require('./config/key').mongoURI;

// connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/courses', courses);
app.use('/api/users', users);

// To fix react routing issue when deployed
app.get('/*', (req, res) => {
  let url = path.join(__dirname, '/client/build', 'index.html');
  if (!url.startsWith('/app/'))
    // we're on local windows
    url = url.substring(1);
  res.sendFile(url);
});

// Serve static assets if in production(aka deploy)
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
}

// listen to port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server sterted on port ${PORT}`));
