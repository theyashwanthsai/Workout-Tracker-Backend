const User = require('../models/user');
const Exercise = require('../models/exercise');
const dateUtil = require('../utils/dateQueryParams');

exports.createAndSaveExercise = (data) => {
  return User.findById(data._id)
    .then((user) => {
      const exercise = new Exercise({
        userId: user._id,
        username: user.username,
        description: data.description,
        duration: data.duration,
        date: data.date,
      });

      return exercise.save();
    })
    .then((savedExerciseObj) => {
      return {
        username: savedExerciseObj.username,
        description: savedExerciseObj.description,
        duration: savedExerciseObj.duration,
        date: savedExerciseObj.date.toDateString(),
        _id: savedExerciseObj.userId,
      };
    })
    .catch((err) => {
      return { error: err };
    });
};

exports.retrieveExercisesLog = (userId, queryParams) => {
  const dateQuerySettings = dateUtil.dateQueryParams(queryParams);
  const query = Object.keys(dateQuerySettings).length > 0 ? { userId: userId, date: dateQuerySettings } : { userId: userId };

  let username;
  let count;
  let log;

  return Exercise.find(query)
    .limit(queryParams.limit)
    .then((exercises) => {
      count = exercises.length;

      log = exercises.map((exercise) => {
        return {
          description: exercise.description,
          duration: exercise.duration,
          date: exercise.date.toDateString(),
        };
      });
    })
    .then(() => {
      return User.findById(userId)
        .then((user) => {
          username = user.username;
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .then(() => {
      return {
        username: username,
        _id: userId,
        count: count,
        log: log,
      };
    })
    .catch((err) => {
      return { error: err };
    });
};