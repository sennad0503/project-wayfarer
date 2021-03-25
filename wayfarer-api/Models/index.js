const mongoose = require('mongoose');
const connectionString = process.env.MongoURI || 'mongodb://localhost:27017/wayfarer';
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
}

mongoose.connect(connectionString, options)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(err));

module.exports = {
  Location: require('./Location'),
  Post: require('./Post'),
  User: require("./User"),
}