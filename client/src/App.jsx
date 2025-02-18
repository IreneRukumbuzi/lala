import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import PropertyDetails from "./pages/PropertyDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Home />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
