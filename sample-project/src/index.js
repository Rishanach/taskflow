const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API is running!' });
});

app.listen(PORT, () => {
  console.log(`TaskFlow server running on http://localhost:${PORT}`);
});

module.exports = app;
