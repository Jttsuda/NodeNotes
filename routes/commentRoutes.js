const express = require('express');
const commentController = require('../controllers/commentController');
const router = express.Router();


// Comment Routes
router.get('/', commentController.comment_index);
router.post('/', commentController.comment_add);
router.get('/:id', commentController.comment_details);
router.delete('/:id', commentController.comment_delete);


module.exports = router;