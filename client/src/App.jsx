import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/LoginPage";
import PropertyDetails from "./pages/PropertyDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import HostDashboard from "./pages/HostDashboard";
import RenterDashboard from "./pages/RenterDashboard";

const RoleBasedRoute = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return user.role === "Host" ? <HostDashboard /> : <RenterDashboard />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<RoleBasedRoute />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
