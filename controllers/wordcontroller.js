const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const word = mongoose.model('word');

router.get('/', (req, res) => {
    // res.render('word/add_edit', {
    //     viewTitle: "Insert Word"
    // });
    res.json('Sucessssss');
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var word = new word();
    word.word_value = req.body.Fullword;
    word.save((err, doc) => {
        if (!err)
            res.redirect('word/list');
    
            else
                console.log('Error during record insertion : ' + err);
    });
}

function updateRecord(req, res) {
    word.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('word/list'); }
            else{
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    word.find((err, docs) => {
        if (!err) {
            res.render("word/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving word list :' + err);
        }
    });
});


router.get('/:id', (req, res) => {
    word.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("word/addOrEdit", {
                viewTitle: "Update word",
                word: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    word.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/word/list');
        }
        else { console.log('Error in word delete :' + err); }
    });
});

module.exports = router;