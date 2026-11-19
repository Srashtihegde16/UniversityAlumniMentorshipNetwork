
const router = require('express').Router();
const db = require('../config/db');
const { wrap, need } = require('../middleware/util');

// POST /api/sessions/:id/feedback body: { rating (1-5), comments? }
router.post('/:id/feedback', wrap(async (req, res) => {
    need(req.body, ['rating']);
    const [r] = await db.query(
        'INSERT INTO feedback (rating, comments, session_id) VALUES (?,?,?)',
        [req.body.rating, req.body.comments || null, req.params.id]);
    res.status(201).json({ feedback_id: r.insertId });
}));

module.exports = router;
