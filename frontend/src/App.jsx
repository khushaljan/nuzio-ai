import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Personalization from "./pages/Personalization";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <Personalization />
          </ProtectedRoute>
        }
      />

      <Route
        path="/news"
        element={
          <ProtectedRoute>
            <News />
          </ProtectedRoute>
        }
      />

      <Route
        path="/news/:id"
        element={
          <ProtectedRoute>
            <NewsDetail />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;