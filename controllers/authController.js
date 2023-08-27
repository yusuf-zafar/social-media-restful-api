const fs = require('fs');
const usersData = require('../data/users.json');

exports.registerUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const newUser = {
    id: Date.now().toString(),
    username,
    password,
  };

  usersData.users.push(newUser);
  saveUsersData();

  res.json({ message: 'User registered successfully.' });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const user = usersData.users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  res.json({ message: 'Login successful.' });
};

function saveUsersData() {
  fs.writeFileSync('./data/users.json', JSON.stringify(usersData, null, 2), 'utf8');
}
