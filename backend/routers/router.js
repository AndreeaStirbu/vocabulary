var express = require('express');
var router = express.Router();

var word_controller = require('../controllers/wordController');;

// GET request for list of all Book items.
router.get('/', word_controller.word_list);
router.get('/:id', word_controller.get_word);

router.post('/add', word_controller.add_word);
router.delete('/delete', word_controller.delete_word);
router.put('/update', word_controller.update_word);
module.exports = router;