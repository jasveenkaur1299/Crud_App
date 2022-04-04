require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Word = mongoose.model('word');
const port = process.env.PORT || 5000;

// const wordcontroller = require('./controllers/wordcontroller');


var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainlayout', layoutsDir: __dirname + '/views/layout/',runtimeOptions: {allowProtoPropertiesByDefault: true,allowProtoMethodsByDefault: true}}));
app.set('view engine', 'hbs');


app.listen(5000, () => {
    console.log('Express server started at port : 5000');
});
app.get('/', (req, res) => {
    res.render('add_edit', {
        viewTitle: "Insert Word"
    });
    
});
app.post('/word', (req, res) => {
    if (req.body._id == '')
    insertRecord(req, res);
    else
    updateRecord(req, res);
        
});


function insertRecord(req, res) {
    var worddetails = new Word({
    word_value:req.body.word_value
    });
  
    worddetails.save((err, doc) => {
        if (!err)
            {
                console.log('Sucessful insertion',req.body)

                res.redirect('list');
            }
    
            else
                console.log('Error during record insertion : ' + err);
    });
}

function updateRecord(req, res) {
    Word.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('list'); }
            else{
                console.log('Error during record update : ' + err);
        }
    });
}

app.get('/list', (req, res) => {
    Word.find((err, docs) => {
        if (!err) {
            res.render('list', {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving word list :' + err);
        }
    });
});


app.get('/:id', (req, res) => {
    Word.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.render('add_edit', {
                viewTitle: "Create word",
                list: docs
            });
        }
    });
});

app.get('/delete/:id', (req, res) => {
    Word.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/list');
        }
        else { 
            console.log(req.body._id)
            console.log('Error in word delete :' + err); }
    });
});


