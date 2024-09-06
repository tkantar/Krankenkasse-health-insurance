import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Mitarbeiter from './pages/Mitarbeiter';
import Patienten from './pages/Patienten';
import PraxisMitarbeiter from './pages/PraxisMitarbeiter';
import AddPraxisMitarbeiter from './pages/AddPraxisMitarbeiter';
import AddPatient from './pages/AddPatient';
import PraxisMitarbeiterTabelle from './pages/PraxisMitarbeiterTabelle';
import EditPraxisMitarbeiter from './pages/EditPraxisMitarbeiter';
import PatientenTabelle from './pages/PatientenTabelle'; // Neue Komponente importieren
import EditPatient from './pages/EditPatient'; // Neue Komponente importieren
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const checkTokenValidity = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const { tokenTimestamp } = JSON.parse(savedUser);
        const currentTime = new Date().getTime();
        if (currentTime - tokenTimestamp > 5 * 60 * 1000) {
          handleLogout();  // Benutzer abmelden, wenn das Token abgelaufen ist
        }
      }
    };

    const interval = setInterval(checkTokenValidity, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route 
          path="/mitarbeiter" 
          element={
            <ProtectedRoute user={user} allowedRoles={["Mitarbeiter"]}>
              <Mitarbeiter user={user} handleLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mitarbeiter/addPraxisMitarbeiter" 
          element={
            <ProtectedRoute user={user} allowedRoles={["Mitarbeiter"]}>
              <AddPraxisMitarbeiter user={user} handleLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mitarbeiter/praxisMitarbeiterTabelle" 
          element={
            <ProtectedRoute user={user} allowedRoles={["Mitarbeiter"]}>
              <PraxisMitarbeiterTabelle user={user} handleLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mitarbeiter/editPraxisMitarbeiter/:praxisMitarbeiternummer" 
          element={
            <ProtectedRoute user={user} allowedRoles={["Mitarbeiter"]}>
              <EditPraxisMitarbeiter user={user} handleLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/addPatient" 
          element={
            <ProtectedRoute user={user} allowedRoles={["Mitarbeiter", "PraxisMitarbeiter"]}>
              <AddPatient user={user} handleLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/patient" 
          element={
            <ProtectedRoute user={user} allowedRoles={["Patient"]}>
              <Patienten user={user} handleLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/praxisMitarbeiter" 
          element={
            <ProtectedRoute user={user} allowedRoles={["PraxisMitarbeiter"]}>
              <PraxisMitarbeiter user={user} handleLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/patientenTabelle" 
          element={
            <ProtectedRoute user={user} allowedRoles={["Mitarbeiter", "PraxisMitarbeiter"]}>
              <PatientenTabelle user={user} handleLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/editPatient/:versichertennummer" 
          element={
            <ProtectedRoute user={user} allowedRoles={["Mitarbeiter", "PraxisMitarbeiter"]}>
              <EditPatient user={user} handleLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to={user ? `/${user.role.toLowerCase()}` : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
