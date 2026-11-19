
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/lookups'));
app.use('/api/students', require('./routes/students'));
app.use('/api/alumni', require('./routes/alumni'));
app.use('/api/requests', require('./routes/requests'));
app.use('/api/mentorships', require('./routes/mentorships'));
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api/stats', require('./routes/stats'));

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
