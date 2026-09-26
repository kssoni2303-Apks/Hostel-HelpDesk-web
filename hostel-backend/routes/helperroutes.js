const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get worker profile
router.get('/profile/:id', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM workers WHERE id = ?", [req.params.id]);

        if (rows.length > 0) {
            res.status(200).json({ success: true, data: rows[0] });
        } else {
            res.status(404).json({ success: false, message: "Worker not found" });
        }
    } catch (err) {
        console.error("Worker profile error:", err);
        res.status(500).json({ success: false, message: "Database error", error: err.message });
    }
});

// Update worker profile
router.put('/update-profile/:id', async (req, res) => {
    const { name, phone, age, sex, experience, post } = req.body;

    try {
        await db.query(
            "UPDATE workers SET name=?, phone=?, age=?, sex=?, experience=?, post=? WHERE id=?",
            [name, phone, age, sex, experience, post, req.params.id]
        );

        const [rows] = await db.query("SELECT * FROM workers WHERE id = ?", [req.params.id]);
        res.status(200).json({ success: true, message: "Profile updated!", data: rows[0] });
    } catch (err) {
        console.error("Worker update error:", err);
        res.status(500).json({ success: false, message: "Update failed", error: err.message });
    }
});

// Get complaints assigned to a worker
router.get('/assigned/:id', async (req, res) => {
    try {
        const [worker] = await db.query(
            "SELECT id, name, post FROM workers WHERE id = ?",
            [req.params.id]
        );

        if (!worker.length) {
            return res.status(404).json({ success: false, message: "Worker not found" });
        }

        const [complaints] = await db.query(
            `SELECT id, title, student_name, room, description, created_at, status
             FROM complaints
             WHERE worker_id = ? AND status != 'Completed'
             ORDER BY created_at DESC`,
            [req.params.id]
        );

        res.status(200).json({
            success: true,
            data: complaints,
            worker: worker[0]
        });
    } catch (err) {
        console.error("Assigned complaints error:", err);
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
});

// Worker dashboard statistics
router.get('/stats/:id', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT
                COUNT(*) AS assigned,
                SUM(status = 'Completed') AS completed,
                SUM(status != 'Completed') AS pending
             FROM complaints
             WHERE worker_id = ?`,
            [req.params.id]
        );

        res.json({
            success: true,
            assigned: Number(rows[0].assigned || 0),
            completed: Number(rows[0].completed || 0),
            pending: Number(rows[0].pending || 0)
        });
    } catch (err) {
        console.error("Worker stats error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update complaint status
router.put('/update-status/:id', async (req, res) => {
    const { status } = req.body;
    const allowed = ['Pending', 'In-Progress', 'Completed'];

    if (!allowed.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status." });
    }

    try {
        const [result] = await db.query(
            "UPDATE complaints SET status = ? WHERE id = ?",
            [status, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Complaint not found." });
        }

        res.status(200).json({ success: true, message: "Status updated!" });
    } catch (err) {
        console.error("Status update error:", err);
        res.status(500).json({ success: false, message: "Update failed", error: err.message });
    }
});

module.exports = router;
