import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Ungültige Anmeldedaten!');
      }

      const data = await response.json();

      // Sicherstellen, dass die Antwort des Backends die E-Mail und den Token enthält
      if (!data.token) {
        throw new Error('Token konnte nicht empfangen werden!');
      }

      const loggedUser = {
        email: data.email,
        role: data.role,
        token: data.token,
        tokenTimestamp: new Date().getTime()
      };

      console.log('Backend Response Data:', data); // Debugging für die Antwort des Backends
      console.log('Logged in user:', loggedUser); // Debugging für den eingeloggten Benutzer

      setUser(loggedUser);
      localStorage.setItem('user', JSON.stringify(loggedUser));

      switch (data.role) {
        case 'Mitarbeiter':
          navigate('/mitarbeiter');
          break;
        case 'PraxisMitarbeiter':
          navigate('/praxisMitarbeiter');
          break;
        case 'Patient':
          navigate('/patient');
          break;
        default:
          navigate('/login');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
