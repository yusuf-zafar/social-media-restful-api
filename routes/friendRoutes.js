const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

router.get('/', friendController.getAllFriends);
router.post('/send-request', friendController.sendFriendRequest);
router.get('/requests', friendController.getAllFriendRequests);
router.put('/requests/:id', friendController.respondToFriendRequest);

module.exports = router;
