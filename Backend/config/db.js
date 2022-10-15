const mongoose = require('mongoose');

const initDB = mongoose.connect(process.env['DB_CONNECTION'], {useNewUrlParser: true, useUnifiedTopology: true ,
useUnifiedTopology:true})
.then(()=> console.log("db connected"))
.catch(err => console.log(err))

module.exports = initDB