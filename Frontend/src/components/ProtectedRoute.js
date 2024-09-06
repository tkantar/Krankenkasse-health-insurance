import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ user, allowedRoles, children }) {
  // Sicherstellen, dass `allowedRoles` und `user` korrekt definiert sind
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!Array.isArray(allowedRoles) || !allowedRoles.includes(user.role)) {
    // Überprüfen, ob `allowedRoles` ein Array ist und `user.role` enthält
    return <Navigate to={`/${user.role.toLowerCase()}`} replace />;
  }

  return children;
}

export default ProtectedRoute;
