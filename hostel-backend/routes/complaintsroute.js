const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST: Save a new complaint
router.post('/submit', async (req, res) => {
    const {
        name, room, phone, email, hostelType,
        hostelName, otherHostel, time, details, category, student_id
    } = req.body;

    const finalHostelName = hostelName === "Other" ? otherHostel : hostelName;
    const title = category || "General";
    const description = details || "";

    try {
        // If the frontend supplied an ID, use it. Otherwise try to find the student by email.
        let studentId = student_id || null;

        if (!studentId && email) {
            const [studentRows] = await db.query(
                "SELECT id FROM students WHERE email = ? LIMIT 1",
                [email]
            );
            if (studentRows.length) studentId = studentRows[0].id;
        }

        // Automatically assign the complaint to the first worker whose post matches the category.
        let workerId = null;
        if (category) {
            const [workers] = await db.query(
                "SELECT id FROM workers WHERE LOWER(post) = LOWER(?) LIMIT 1",
                [category]
            );
            if (workers.length) workerId = workers[0].id;
        }

        const sql = `INSERT INTO complaints
            (title, description, student_id, student_name, room, status, worker_id)
            VALUES (?, ?, ?, ?, ?, 'Pending', ?)`;

        const [result] = await db.query(sql, [
            title,
            description,
            studentId,
            name,
            room,
            workerId
        ]);

        res.status(201).json({
            success: true,
            message: "Complaint saved!",
            complaintId: result.insertId,
            assignedWorkerId: workerId
        });
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Track one complaint
router.get('/track/:id', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT id, title, description, student_id, student_name, room,
                    status, worker_id, created_at, updated_at
             FROM complaints WHERE id = ?`,
            [req.params.id]
        );

        if (!rows.length) {
            return res.status(404).json({ success: false, message: "Complaint ID not found" });
        }

        res.json({ success: true, ...rows[0] });
    } catch (err) {
        console.error("Track complaint error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Complaint history for one student
router.get('/history/:studentId', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT id, title, description, room, status, worker_id, created_at, updated_at
             FROM complaints
             WHERE student_id = ?
             ORDER BY created_at DESC`,
            [req.params.studentId]
        );

        res.json({ success: true, data: rows });
    } catch (err) {
        console.error("Complaint history error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Admin: all complaints
router.get('/all', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT id, title, description, student_name, room, status, worker_id,
                    created_at, updated_at
             FROM complaints
             ORDER BY created_at DESC`
        );
        res.json({ success: true, data: rows });
    } catch (err) {
        console.error("All complaints error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Admin: pending complaints
router.get('/pending', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT id, title, description, student_name, room, status, created_at
             FROM complaints
             WHERE status = 'Pending'
             ORDER BY created_at DESC`
        );
        res.json({ success: true, data: rows });
    } catch (err) {
        console.error("Pending complaints error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Admin dashboard statistics
router.get('/stats', async (req, res) => {
    try {
        const [totalRows] = await db.query("SELECT COUNT(*) AS total FROM complaints");
        const [pendingRows] = await db.query(
            "SELECT COUNT(*) AS pending FROM complaints WHERE status = 'Pending'"
        );

        res.status(200).json({
            success: true,
            total: totalRows[0].total,
            pending: pendingRows[0].pending
        });
    } catch (err) {
        console.error("Complaint stats error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Recent complaints
router.get('/recent', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT id, student_name, room, title, status, created_at
             FROM complaints
             ORDER BY created_at DESC
             LIMIT 5`
        );
        res.status(200).json({ success: true, data: rows });
    } catch (err) {
        console.error("Recent complaints error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
