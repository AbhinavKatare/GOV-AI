const express = require('express');
const authMiddleware = require('../middleware/auth');
const db = require('../config/database');

const router = express.Router();

/* ── GET /api/applications ── */
router.get('/', authMiddleware, async (req, res) => {
    try {
        const result = await db.query(
            `SELECT a.*, s.name as scheme_name, s.department as scheme_department
             FROM applications a
             JOIN schemes s ON a.scheme_id = s.id
             WHERE a.user_id = ?
             ORDER BY a.submitted_at DESC`,
            [req.user.id]
        );

        const rows = result.rows.map(r => {
            try { r.timeline = JSON.parse(r.timeline || '[]'); } catch { r.timeline = []; }
            try { r.application_data = JSON.parse(r.application_data || '{}'); } catch { }
            return r;
        });

        res.json({ success: true, data: rows });
    } catch (err) {
        console.error('Get applications error:', err);
        res.status(500).json({ success: false, message: 'Server error fetching applications' });
    }
});

/* ── GET /api/applications/:id ── */
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const result = await db.query(
            `SELECT a.*, s.name as scheme_name, s.description as scheme_description,
                    s.department as scheme_department
             FROM applications a
             JOIN schemes s ON a.scheme_id = s.id
             WHERE a.id = ? AND a.user_id = ?`,
            [req.params.id, req.user.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }
        const row = result.rows[0];
        try { row.timeline = JSON.parse(row.timeline || '[]'); } catch { row.timeline = []; }
        res.json({ success: true, data: row });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

/* ── POST /api/applications ── */
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { scheme_id, application_data } = req.body;
        if (!scheme_id) {
            return res.status(400).json({ success: false, message: 'Scheme ID is required' });
        }

        const schemeCheck = await db.query(
            'SELECT id FROM schemes WHERE id = ? AND is_active = 1', [scheme_id]
        );
        if (schemeCheck.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Scheme not found or inactive' });
        }

        const dupCheck = await db.query(
            `SELECT id FROM applications WHERE user_id = ? AND scheme_id = ? AND status != 'rejected'`,
            [req.user.id, scheme_id]
        );
        if (dupCheck.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'You have already applied for this scheme' });
        }

        const timeline = JSON.stringify([{
            stage: 'submitted',
            timestamp: new Date().toISOString(),
            note: 'Application submitted successfully',
        }]);

        await db.query(
            `INSERT INTO applications (user_id, scheme_id, application_data, status, stage, timeline)
             VALUES (?, ?, ?, 'submitted', 'initial_review', ?)`,
            [req.user.id, scheme_id, JSON.stringify(application_data || {}), timeline]
        );

        // Create notification
        await db.query(
            `INSERT INTO notifications (user_id, title, message, type)
             VALUES (?, 'Application Submitted', 'Your application has been submitted and is under review.', 'application')`,
            [req.user.id]
        );

        res.status(201).json({ success: true, message: 'Application submitted successfully' });
    } catch (err) {
        console.error('Submit application error:', err);
        res.status(500).json({ success: false, message: 'Server error submitting application' });
    }
});

module.exports = router;
