const express = require('express');
const bodyParser = require('body-parser');
const friendRoutes = require('./routes/friendRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/friends', friendRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
