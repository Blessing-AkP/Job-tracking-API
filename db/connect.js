const mongoose = require('mongoose');

const connectDataBase = (url)=>{
    return mongoose.connect(url, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true
    })
}

module.exports = connectDataBase;