var word = require('../models/word');

// Display list of all words.
exports.word_list = function(req, res) {    
    word.getAllWords(function(data) {
        res.send(data);
    });
};

exports.get_word = function(req, res) {    
    word.getWord(req.params.id, function(data) {
        res.send(data);
    });
};

exports.add_word = function(req, res) {    
    //res.send(req.body.id + '');
    word.addWord(req.body.id, req.body.word, req.body.def, req.body.example, function() {
        res.send('Word Added')
    });
};

exports.delete_word = function(req, res) {    
    //res.send(req.body.id + '');
    word.deleteWord(req.body.id, function() {
        res.send('Word deleted')
    });
};

exports.update_word = function(req, res) {    
    console.log(req.body.id, req.body.word, req.body.def, req.body.example);
    word.updateWord(req.body.id, req.body.word, req.body.def, req.body.example, function() {
        res.send('Word updated')
    });
};
