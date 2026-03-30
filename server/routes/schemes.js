const express = require('express');
const authMiddleware = require('../middleware/auth');
const db = require('../config/database');

const router = express.Router();

/* ── GET /api/schemes ── */
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = `SELECT id, name, description, category, department, benefits, deadline, is_active
                     FROM schemes WHERE is_active = 1`;
        const params = [];

        if (category) {
            params.push(category);
            query += ` AND category = ?`;
        }
        if (search) {
            params.push(`%${search}%`, `%${search}%`);
            query += ` AND (name LIKE ? OR description LIKE ?)`;
        }
        query += ' ORDER BY created_at DESC';

        const result = await db.query(query, params);
        res.json({ success: true, data: result.rows });
    } catch (err) {
        console.error('Get schemes error:', err);
        res.status(500).json({ success: false, message: 'Server error fetching schemes' });
    }
});

/* ── GET /api/schemes/recommendations/me ── */
router.get('/recommendations/me', authMiddleware, async (req, res) => {
    try {
        const profileResult = await db.query(
            `SELECT p.skills, u.department
             FROM users u
             LEFT JOIN user_profiles p ON u.id = p.user_id
             WHERE u.id = ?`,
            [req.user.id]
        );

        const dept = profileResult.rows[0]?.department || 'General';

        const result = await db.query(
            `SELECT *,
                CASE WHEN department = ? THEN 95
                     WHEN category = 'Education' THEN 85
                     ELSE 75
                END as match_score
             FROM schemes WHERE is_active = 1
             ORDER BY match_score DESC, created_at DESC
             LIMIT 10`,
            [dept]
        );

        res.json({
            success: true,
            data: result.rows.map(s => ({ ...s, match_percentage: s.match_score })),
        });
    } catch (err) {
        console.error('Get recommendations error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/* ── GET /api/schemes/:id ── */
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM schemes WHERE id = ?', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Scheme not found' });
        }
        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
