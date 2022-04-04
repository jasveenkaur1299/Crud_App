const mongoose = require('mongoose');

var WordSchema = new mongoose.Schema({
    word_value: {
        type: String,
        required: 'This field is required.'
    }
});


mongoose.model('word', WordSchema);