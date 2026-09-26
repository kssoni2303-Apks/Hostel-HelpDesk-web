const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Student count for Admin Dashboard
router.get('/count', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT COUNT(*) AS total FROM students WHERE LOWER(role) = 'student'");
        res.status(200).json({ success: true, count: rows[0].total });
    } catch (err) {
        console.error("Student count error:", err);
        res.status(500).json({ success: false, message: "Failed to fetch student count", error: err.message });
    }
});

// Register a Student or Helper
router.post('/register', async (req, res) => {
    const {
        full_name, email, phone_number, hostel_type, hostel_name,
        registration_number, role, password
    } = req.body;

    try {
        const normalizedRole = String(role || "Student").trim().toLowerCase();

        if (normalizedRole === "helper") {
            const sql = `INSERT INTO workers (name, email, phone, password, post)
                         VALUES (?, ?, ?, ?, ?)`;
            await db.query(sql, [
                full_name,
                email,
                phone_number || null,
                password,
                req.body.post || "General"
            ]);
            return res.status(201).json({ success: true, message: "Helper account created successfully!" });
        }

        // Admin/Warden accounts are normally created by the system.
        // Student registration is the normal public signup.
        const savedRole = normalizedRole === "admin" || normalizedRole === "caretaker"
            ? "Admin"
            : "Student";

        const sql = `INSERT INTO students
            (full_name, email, phone_number, hostel_type, hostel_name, registration_number, role, password)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        await db.query(sql, [
            full_name,
            email,
            phone_number || null,
            hostel_type || null,
            hostel_name || null,
            registration_number || null,
            savedRole,
            password
        ]);

        res.status(201).json({
            success: true,
            message: savedRole === "Admin"
                ? "Admin account created successfully!"
                : "Account created successfully!"
        });
    } catch (err) {
        console.error("Registration error:", err);

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                success: false,
                message: "Email or Registration Number already exists!"
            });
        }

        res.status(500).json({ success: false, message: "Database Error", error: err.message });
    }
});

// Login: Admin + Student + Helper
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
    const requestedRole = String(role || "").trim().toLowerCase();

    // Keep the demo/admin account available even if no admin row exists.
    if (email === "admin@hostel.com" && password === "admin123") {
        return res.status(200).json({
            success: true,
            user: {
                id: "admin",
                full_name: "System Admin",
                email,
                role: "Admin"
            }
        });
    }

    try {
        // Student/Admin users live in students table.
        if (requestedRole === "student" || requestedRole === "admin" || requestedRole === "caretaker" || !requestedRole) {
            const [studentRows] = await db.query(
                "SELECT * FROM students WHERE email = ? AND password = ?",
                [email, password]
            );

            if (studentRows.length > 0) {
                const student = studentRows[0];
                const dbRole = String(student.role || "Student").toLowerCase();

                if (requestedRole && requestedRole !== dbRole &&
                    !(requestedRole === "admin" && dbRole === "caretaker")) {
                    return res.status(403).json({
                        success: false,
                        message: `This account is registered as ${student.role}.`
                    });
                }

                return res.status(200).json({
                    success: true,
                    user: {
                        ...student,
                        full_name: student.full_name,
                        role: dbRole === "caretaker" ? "Admin" : (student.role || "Student")
                    }
                });
            }
        }

        // Helpers/workers live in workers table.
        if (requestedRole === "helper" || !requestedRole) {
            const [workerRows] = await db.query(
                "SELECT * FROM workers WHERE email = ? AND password = ?",
                [email, password]
            );

            if (workerRows.length > 0) {
                const worker = workerRows[0];

                return res.status(200).json({
                    success: true,
                    user: {
                        ...worker,
                        full_name: worker.name,
                        role: "Helper"
                    }
                });
            }
        }

        return res.status(401).json({
            success: false,
            message: "Invalid email or password."
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
});

// Student profile
router.get('/profile/:id', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT id, full_name, email, phone_number, hostel_type, hostel_name,
                    registration_number, role
             FROM students WHERE id = ?`,
            [req.params.id]
        );

        if (!rows.length) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.json({ success: true, data: rows[0] });
    } catch (err) {
        console.error("Student profile error:", err);
        res.status(500).json({ success: false, message: "Database error", error: err.message });
    }
});

router.put('/profile/:id', async (req, res) => {
    const { full_name, phone_number, hostel_type, hostel_name, registration_number } = req.body;

    try {
        await db.query(
            `UPDATE students
             SET full_name = ?, phone_number = ?, hostel_type = ?, hostel_name = ?, registration_number = ?
             WHERE id = ?`,
            [
                full_name,
                phone_number || null,
                hostel_type || null,
                hostel_name || null,
                registration_number || null,
                req.params.id
            ]
        );

        const [rows] = await db.query(
            `SELECT id, full_name, email, phone_number, hostel_type, hostel_name,
                    registration_number, role
             FROM students WHERE id = ?`,
            [req.params.id]
        );

        res.json({ success: true, message: "Profile updated successfully!", data: rows[0] });
    } catch (err) {
        console.error("Student profile update error:", err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: "Registration number already exists." });
        }
        res.status(500).json({ success: false, message: "Update failed", error: err.message });
    }
});

// Fetch all students
router.get('/all-students', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT id, full_name, email, hostel_type, hostel_name, phone_number,
                    registration_number
             FROM students
             WHERE LOWER(role) = 'student'
             ORDER BY id DESC`
        );
        res.status(200).json(rows);
    } catch (err) {
        console.error("Fetch students error:", err);
        res.status(500).json({
            message: "Failed to load students",
            error: err.message
        });
    }
});

module.exports = router;
