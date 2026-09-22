const mongoose = require('mongoose');

const connectToMongo = async () => {
    await mongoose.connect('mongodb://localhost:27017/inotebook');
    console.log("Connected to MongoDB Successfully!");
}

module.exports = connectToMongo;


