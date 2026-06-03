const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'taskflow-super-secret-key';
const SALT_ROUNDS = 10;

async function register(email, password) {
  const existing = User.findByEmail(email);
  if (existing) {
    throw new Error('A user with that email already exists');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = User.create(email, passwordHash);

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
  return { user: { id: user.id, email: user.email }, token };
}

async function login(email, password) {
  const user = User.findByEmail(email);

  // 🐛 BUG: user.passwordHash is accessed without checking if user is undefined first.
  // If no account exists for this email, this throws:
  //   TypeError: Cannot read properties of undefined (reading 'passwordHash')
  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
  return { user: { id: user.id, email: user.email }, token };
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { register, login, verifyToken };
