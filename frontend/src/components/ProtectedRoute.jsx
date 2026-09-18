import { Navigate } from "react-router-dom";

// Blocks access to protected pages when there is no JWT token.
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;