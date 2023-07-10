const User = require('../modal/user');

// User registration
const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const newUser = new User({ username, password, role });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register a user' });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // You can use JSON Web Tokens (JWT) for authentication and session management

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login' });
  }
};

module.exports = { registerUser, loginUser };
