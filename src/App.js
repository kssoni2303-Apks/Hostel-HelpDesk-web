import { Routes, Route } from "react-router-dom";

// Public
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import LoginSelection from "./pages/Admin/loginsection";

// Admin
import AdminDashboard from "./pages/Admin/admindashboard";
import StudentList from "./pages/Admin/studentslist";
import AllComplaints from "./pages/Admin/allcomplaints";
import PendingComplaints from "./pages/Admin/pendingcomplaints";

// Student
import StudentHome from "./students/components/homesec/homesec";
import FileComplaint from "./students/components/filecomplaint/filecomplaint";
import TrackComplaint from "./students/components/trackcomplaint/trackcomplaint";
import Profile from "./students/components/profile/profile";
import ComplaintHistory from "./students/components/complainthistory/complainthistory";
import Complaintform from "./students/components/filecomplaint/complaintform";

// Helper
import Helperdashboard from "./helper/helperdashboard";
import Helperprofile from "./helper/helperprofile";
import WorkerAssigned from "./helper/workassigned";

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/select-login" element={<LoginSelection />} />
      <Route path="/login/:role" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/students" element={<StudentList />} />
      <Route path="/admin/complaints" element={<AllComplaints />} />
      <Route
        path="/admin/complaints/pending"
        element={<PendingComplaints />}
      />

      {/* Student */}
      <Route path="/student/homesec" element={<StudentHome />} />
      <Route path="/students/fileComplaint" element={<FileComplaint />} />
      <Route path="/students/track" element={<TrackComplaint />} />
      <Route path="/students/profile" element={<Profile />} />
      <Route path="/students/history" element={<ComplaintHistory />} />
      <Route path="/students/complaintform" element={<Complaintform />} />
      <Route
        path="/students/filecomplaint/:category"
        element={<Complaintform />}
      />

      {/* Helper */}
      <Route path="/helper/dashboard" element={<Helperdashboard />} />
      <Route path="/helper/profile" element={<Helperprofile />} />
      <Route path="/helper/assigned" element={<WorkerAssigned />} />

    </Routes>
  );
}

export default App;