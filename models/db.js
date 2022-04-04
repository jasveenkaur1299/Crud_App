const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/Words_DB', { useNewUrlParser: true }, (err) => {
//     if (!err) { console.log('MongoDB Connection Succeeded.') }
//     else { console.log('Error in DB connection : ' + err) }
// });

mongoose.connect('mongodb+srv://admin:admin@cluster0.ak1io.mongodb.net/WordsDB?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});



require('./words.model');