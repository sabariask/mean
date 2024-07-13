const mongoose = require('mongoose');

// This will allow to make async operation on back end side
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/taskmanagerdb', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { console.log("DB connected Successfully!!") })
    .catch((err) => { console.log(err) });


module.exports = mongoose;