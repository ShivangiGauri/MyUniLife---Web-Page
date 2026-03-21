import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/kala.css";

/* Public */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* Protected Route */
import ProtectedRoute from "./routes/ProtectedRoute";

/* Layouts */
import StudentLayout from "./layouts/StudentLayout";
import AdminLayout from "./layouts/AdminLayout";
import GuestLayout from "./layouts/GuestLayout";
import ClubLayout from "./layouts/ClubLayout";

/* STUDENT */
import Overview from "./pages/student/Overview";
import Activities from "./pages/student/Activities";
import Portfolio from "./pages/student/Portfolio";
import RegisteredEvents from "./pages/student/RegisteredEvents";
import SavedEvents from "./pages/student/SavedEvents";
import Status from "./pages/student/Status";
import Settings from "./pages/student/Settings";
import EventDetails from "./pages/student/EventDetails";
/* STUDENT EVENT PAGES */
import UpcomingAll from "./pages/student/events/UpcomingAll";
import UpcomingNearby from "./pages/student/events/UpcomingNearby";
import OngoingEvents from "./pages/student/events/OngoingEvents";
import CompletedEvents from "./pages/student/events/CompletedEvents";
import ArchiveEvents from "./pages/student/events/ArchiveEvents";

/* ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Clubs from "./pages/admin/Clubs";
import Events from "./pages/admin/Events";
import Support from "./pages/admin/Support";
import Analytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/AdminSettings";

/* CLUB */
import ClubDashboard from "./pages/club/ClubDashboard";
import CreateClubEvent from "./pages/club/CreateClubEvent";
import ClubEvents from "./pages/club/ClubEvents";
import ManageParticipants from "./pages/club/ManageParticipants";

/* GUEST */
import GuestDashboard from "./pages/guest/GuestDashboard";
import GuestEvents from "./pages/guest/GuestEvents";
import GuestInsights from "./pages/guest/GuestInsights";
import CreateEvent from "./pages/guest/CreateEvent";

function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* STUDENT ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="overview" />} />
          <Route path="overview" element={<Overview />} />
          <Route path="activities" element={<Activities />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="registered" element={<RegisteredEvents />} />
          <Route path="saved" element={<SavedEvents />} />
          <Route path="status" element={<Status />} />
          <Route path="settings" element={<Settings />} />
          <Route path="event/:id" element={<EventDetails />} />
          <Route path="upcoming-all" element={<UpcomingAll />} />
          <Route path="nearby" element={<UpcomingNearby />} />
          <Route path="ongoing" element={<OngoingEvents />} />
          <Route path="completed" element={<CompletedEvents />} />
          <Route path="archive" element={<ArchiveEvents />} />
        </Route>
      </Route>

      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="events" element={<Events />} />
          <Route path="support" element={<Support />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* CLUB ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["club"]} />}>
        <Route path="/club" element={<ClubLayout />}>
          <Route index element={<ClubDashboard />} />
          <Route path="dashboard" element={<ClubDashboard />} />
          <Route path="create-event" element={<CreateClubEvent />} />
          <Route path="my-events" element={<ClubEvents />} />
          <Route path="manage-events" element={<ManageParticipants />} />
          
          {/* Student Features for Club */}
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="saved" element={<SavedEvents />} />
          <Route path="registered" element={<RegisteredEvents />} />
          
          {/* Topbar Routes */}
          <Route path="upcoming-all" element={<UpcomingAll />} />
          <Route path="nearby" element={<UpcomingNearby />} />
          <Route path="ongoing" element={<OngoingEvents />} />
          <Route path="completed" element={<CompletedEvents />} />
          <Route path="archive" element={<ArchiveEvents />} />
        </Route>
      </Route>

      {/* GUEST ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["guest"]} />}>
        <Route path="/guest" element={<GuestLayout />}>
          <Route index element={<GuestDashboard />} />
          <Route path="dashboard" element={<GuestDashboard />} />
          <Route path="events" element={<GuestEvents />} />
          <Route path="insights" element={<GuestInsights />} />
          <Route path="create-event" element={<CreateEvent />} />
        </Route>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;