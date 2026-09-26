HOSTEL HELPDESK - INTERVIEW READY COPY
========================================

IMPORTANT
---------
This is a patched COPY of the project. Your original project is unchanged.

WHAT WAS FIXED
--------------
1. Complaint INSERT now matches the actual MySQL complaints table:
   id, title, description, student_id, student_name, room, status, worker_id,
   created_at, updated_at.

2. Admin All Complaints is now loaded from MySQL.

3. Admin Pending Complaints is now loaded from MySQL.

4. Admin Recent Complaints uses actual database columns.

5. Student Complaint History is now loaded from MySQL.

6. Student Profile now loads/updates the real students table.

7. Student complaint submission uses the logged-in student's ID.

8. Complaints are automatically assigned to a worker whose `post` matches
   the complaint category, when such a worker exists.

9. Helper Assigned Complaints now uses worker_id and actual complaint columns.

10. Helper Dashboard counts are now loaded from MySQL.

11. Login stores workerId/workerName for helper accounts and sends the selected
    role to the backend.

12. App.js includes the missing admin complaint routes.

DATABASE TABLES EXPECTED
------------------------
students:
id, full_name, email, phone_number, hostel_type, hostel_name,
registration_number, role, password

workers:
id, name, email, phone, password, created_at, age, sex, experience, post

complaints:
id, title, description, student_id, student_name, room, status,
worker_id, created_at, updated_at

HOW TO RUN
----------
Backend:
  cd hostel-backend
  npm install
  npm run dev

Frontend (in a second terminal):
  cd hostel-frontend
  npm install
  npm start

The backend should run on:
  http://localhost:5000

The frontend should normally run on:
  http://localhost:3000

ADMIN DEMO LOGIN
----------------
Email: admin@hostel.com
Password: admin123

IMPORTANT FOR HELPER DEMO
--------------------------
A worker must exist in the `workers` table, and its `post` should match one
of the complaint categories exactly (Electrician, Plumber, Carpenter, Cleaner)
for automatic assignment.

SAFEST INTERVIEW DEMO
---------------------
1. Start MySQL.
2. Start backend with `npm run dev`.
3. Open the frontend with `npm start`.
4. Create/login as a Student.
5. File an Electrician/Plumber/Carpenter/Cleaner complaint.
6. Note the Complaint ID.
7. Open Admin Dashboard and show:
   - Total Students
   - Total Complaints
   - Pending Complaints
   - Recent Complaints
8. Open All Complaints.
9. Login as a Helper whose post matches the complaint category.
10. Open Assigned and change status to In-Progress or Completed.
11. Return to Student and track the complaint by its ID.

SECURITY NOTE
-------------
The existing project stores passwords as plain text and includes a demo admin
credential in code. This is acceptable only as a short classroom/interview
prototype. For a production system, use password hashing (bcrypt), proper
authentication tokens/sessions, authorization middleware, and environment
variables for secrets.
