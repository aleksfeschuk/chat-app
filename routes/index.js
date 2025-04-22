const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.getIndex);
router.get('/new', messageController.getNewForm);
router.post('/new', messageController.postNewMessage);
router.get('/message/:id', messageController.getMessageDetails);

module.exports = router;