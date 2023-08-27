const _ = require('lodash');
const fs = require('fs');
const friendsData = require('../data/friends.json');

const PAGE_SIZE = 10;

exports.getAllFriends = (req, res) => {
  const { page = 1, limit = PAGE_SIZE, senderUsername, sort } = req.query;

  let filteredFriends = friendsData.friends;

  if (senderUsername) {
    filteredFriends = filteredFriends.filter(friend => friend.senderUsername.includes(senderUsername));
  }

  if (sort) {
    filteredFriends = _.orderBy(filteredFriends, [sort], ['asc']);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedFriends = filteredFriends.slice(startIndex, endIndex);

  res.json({
    data: paginatedFriends,
    page: parseInt(page),
    totalItems: filteredFriends.length,
  });
};


exports.sendFriendRequest = (req, res) => {
  const { senderUsername, recieverUsername } = req.body;

  if (!senderUsername || !recieverUsername) {
    return res.status(400).json({ error: 'Sender ID and receiver ID are required.' });
  }

  const newFriendRequest = {
    id: Date.now().toString(),
    senderUsername,
    recieverUsername,
    status: 'pending',
  };

  friendsData.friendRequests.push(newFriendRequest);
  saveFriendsData();

  res.json({ message: 'Friend request sent successfully.' });
};

exports.getAllFriendRequests = (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedRequests = friendsData.friendRequests.slice(startIndex, endIndex);

  res.json({
    data: paginatedRequests,
    page: parseInt(page),
    totalItems: friendsData.friendRequests.length,
    
  });
};

exports.respondToFriendRequest = (req, res) => {
  const requestId = req.params.id;
  const { accepted } = req.body;

  if (accepted === undefined) {
    return res.status(400).json({ error: 'Accepted field is required.' });
  }

  const requestIndex = friendsData.friendRequests.findIndex(req => req.id === requestId);

  if (requestIndex === -1) {
    return res.status(404).json({ error: 'Friend request not found.' });
  }

  const request = friendsData.friendRequests[requestIndex];

  if (accepted) {
    request.status = 'accepted';
    friendsData.friends.push({id:requestId, senderUsername: request.senderUsername, recieverUsername: request.recieverUsername });
  } else {
    request.status = 'rejected';
  }

  friendsData.friendRequests.splice(requestIndex, 1);
  saveFriendsData();

  res.json({ message: `Friend request ${request.status}` });
};

function saveFriendsData() {
  fs.writeFileSync('./data/friends.json', JSON.stringify(friendsData, null, 2), 'utf8');
}
