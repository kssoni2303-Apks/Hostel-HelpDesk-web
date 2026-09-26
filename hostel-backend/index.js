const express = require('express');
const cors = require('cors');
// app.use(express.json());

require('dotenv').config();

// Import Routes and DB
const complaintsRoute = require('./routes/complaintsroute');
const studentsRoutes = require('./routes/studentsroutes'); 
const helperRoutes = require('./routes/helperroutes'); // ✅ Added: Import the worker/helper logic
const db = require('./config/db');

const app = express();

// 1. Middleware (Always put these first)
app.use(cors());
app.use(express.json()); 

// 2. API Routes
app.use('/api/complaints', complaintsRoute);
app.use('/api/students', studentsRoutes);
app.use('/worker', helperRoutes); // ✅ Added: Connects your WorkerAssigned logic to the /worker path

// 3. Status/Test Routes
app.get('/', (req, res) => {
    res.send("<h1>Hostel Helpdesk API is running!</h1><p>Visit /test-db to check database connection.</p>");
});

app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        res.send({ message: "Database connected successfully!", data: rows });
    } catch (err) {
        res.status(500).send({ message: "Database connection failed", error: err.message });
    }
});

// 4. Start Server (Only call app.listen ONCE at the very bottom)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});