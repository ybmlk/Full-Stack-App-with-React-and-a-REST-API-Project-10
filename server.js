// Import Modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// Import routes
const courses = require('./routes/courses');
const users = require('./routes/users');

// Create Express app
const app = express();

// Enable all CORS Requests
app.use(cors());

// Setup morgan which gives us http request logging
app.use(morgan('dev'));

// Bodyparser middleware
app.use(express.json());

// DB config (mongoURI)
const db = require('./config/key').mongoURI;

// connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || db, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/courses', courses);
app.use('/api/users', users);

// Serve static assets if in production(aka deploy)
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // load index.html
  /* app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  }); */
}

// listen to port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server sterted on port ${port}`));
