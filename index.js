const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const userController = require('./controllers/user');
const exerciseController = require('./controllers/exercise');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env['MONGO_URI'], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/users', (req, res) => {
  const username = req.body.username;
  userController
    .createAndSaveUser(username)
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/api/users', (req, res) => {
  userController
    .findAllUsers()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/api/users/:_id/exercises', (req, res) => {
  const _id = req.params._id;
  const { description, duration, date } = req.body;

  const formattedDate = !date ? new Date() : new Date(date);
  const data = { _id, description, duration, date: formattedDate };

  exerciseController
    .createAndSaveExercise(data)
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/api/users/:_id/logs', (req, res) => {
  const userId = req.params._id;
  let { from, to, limit } = req.query;

  if (to) to = new Date(to);
  if (from) from = new Date(from);
  if (limit) limit = parseInt(limit);

  const queryParams = { from, to, limit };

  exerciseController
    .retrieveExercisesLog(userId, queryParams)
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});