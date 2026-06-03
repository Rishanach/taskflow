const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'taskflow-super-secret-key';
const SALT_ROUNDS = 10;

async function register(email, password) {
  const trimmedEmail = email.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    throw new Error('Email is invalid');
  }

  if (typeof password !== 'string' || password.trim().length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  const existing = User.findByEmail(trimmedEmail);
  if (existing) {
    throw new Error('A user with that email already exists');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = User.create(trimmedEmail, passwordHash);

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
  return { user: { id: user.id, email: user.email }, token };
}

async function login(email, password) {
  const trimmedEmail = email.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    throw new Error('Email is invalid');
  }

  if (typeof password !== 'string' || password.trim().length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  const user = User.findByEmail(trimmedEmail);

  if (!user) {
    throw new Error('Invalid credentials');
  }

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

