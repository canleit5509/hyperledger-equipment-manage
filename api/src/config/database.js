const mongoose = require('mongoose');

const {
  MONGO_URI,
} = process.env;

exports.connect = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};
