const User = require('../models/user');

exports.createAndSaveUser = (username) => {
  const user = new User({
    username: username,
  });

  return user
    .save()
    .then((savedUserObj) => {
      return { username: savedUserObj.username, _id: savedUserObj._id };
    })
    .catch((err) => {
      return { error: err };
    });
};

exports.findAllUsers = () => {
  return User.find({})
    .then((users) => {
      const modifiedUsersArr = users.map((user) => {
        return { _id: user._id, username: user.username };
      });
      return modifiedUsersArr;
    })
    .catch((err) => {
      return { error: err };
    });
};