import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardLayout from "./layout/DashboardLayout";

// Main pages
import Overview from "./pages/Overview";
import Activities from "./pages/Activities";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import Status from "./pages/Status";
import Settings from "./pages/Settings";
import ContactAdmin from "./pages/ContactAdmin";

// Event pages
import UniUpcoming from "./events/UniUpcoming";
import UniPast from "./events/UniPast";
import UniAll from "./events/UniAll";
import UpcomingAll from "./events/UpcomingAll";
import UpcomingNearby from "./events/UpcomingNearby";
import OngoingEvents from "./events/OngoingEvents";
import EventDetails from "./pages/EventDetails";
import CompletedEvents from "./events/CompletedEvents";
import ArchiveEvents from "./events/ArchiveEvents";
import SavedEvents from "./pages/SavedEvents";
import RegisteredEvents from "./pages/RegisteredEvents";


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>

        {/* Default redirect */}
        <Route index element={<Navigate to="overview" />} />

        {/* Core Pages */}
        <Route path="overview" element={<Overview />} />
        <Route path="activities" element={<Activities />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="profile" element={<Profile />} />
        <Route path="status" element={<Status />} />
        <Route path="settings" element={<Settings />} />
        <Route path="event/:id" element={<EventDetails />} />

        {/* Sidebar Routes */}
        <Route path="uni-upcoming" element={<UniUpcoming />} />
        <Route path="uni-past" element={<UniPast />} />
        <Route path="uni-all" element={<UniAll />} />

        {/* Top Nav Routes */}
        <Route path="upcoming-all" element={<UpcomingAll />} />
        <Route path="nearby" element={<UpcomingNearby />} />
        <Route path="contact" element={<ContactAdmin />} />
        <Route path="ongoing" element={<OngoingEvents />} />
        <Route path="completed" element={<CompletedEvents />} />
        <Route path="archive" element={<ArchiveEvents />} />
        <Route path="saved" element={<SavedEvents />} />
        <Route path="registered" element={<RegisteredEvents />} />

      </Route>
    </Routes>
  );
}

export default App;
