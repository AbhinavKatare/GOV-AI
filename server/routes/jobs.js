const express = require('express');
const db = require('../config/database');

const router = express.Router();

/* ── GET /api/jobs ── */
router.get('/', async (req, res) => {
    try {
        const { search, location, job_type } = req.query;
        let query = `SELECT * FROM jobs WHERE is_active = 1`;
        const params = [];

        if (search) {
            params.push(`%${search}%`, `%${search}%`);
            query += ` AND (title LIKE ? OR description LIKE ?)`;
        }
        if (location) {
            params.push(`%${location}%`);
            query += ` AND location LIKE ?`;
        }
        if (job_type) {
            params.push(job_type);
            query += ` AND job_type = ?`;
        }

        query += ' ORDER BY created_at DESC';

        const result = await db.query(query, params);
        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error('Get jobs error:', err);
        res.status(500).json({ success: false, message: 'Server error fetching jobs' });
    }
});

/* ── GET /api/jobs/:id ── */
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM jobs WHERE id = ?', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
