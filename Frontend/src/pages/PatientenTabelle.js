import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function PatientenTabelle({ user, handleLogout }) {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser || !storedUser.token) {
          throw new Error('Benutzer nicht authentifiziert. Bitte melden Sie sich erneut an.');
        }

        const response = await fetch('http://localhost:8080/api/patient', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${storedUser.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Zugriff verweigert. Bitte überprüfen Sie Ihre Berechtigungen.');
          } else {
            throw new Error('Fehler beim Abrufen der Patienten-Daten');
          }
        }

        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Patienten-Daten:', error);
        setError(error.message);
      }
    };

    fetchPatients();
  }, [user]);



  const handleDelete = async (versichertennummer) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user')); // Prüfen, ob der Benutzer im lokalen Speicher gespeichert ist
      if (!storedUser || !storedUser.token) {
        throw new Error('Benutzer nicht authentifiziert. Bitte melden Sie sich erneut an.');
      }

      const response = await fetch(`http://localhost:8080/api/patient/${versichertennummer}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${storedUser.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Fehler beim Löschen des Patienten');
      }

      // Aktualisiere die Tabelle nach dem Löschen
      setPatients(patients.filter((patient) => patient.versichertennummer !== versichertennummer));
    } catch (error) {
      console.error('Fehler beim Löschen des Patienten:', error);
      setError(error.message);
    }
  };

  const handleEdit = (versichertennummer) => {
    navigate(`/editPatient/${versichertennummer}`);
  };

  if (error) {
    return (
      <div>
        <Header user={user} handleLogout={handleLogout} />
        <p style={{ color: 'red', padding: '20px' }}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <div style={{ padding: '20px' }}>
        <h2>Patienten Tabelle</h2>
        <button onClick={() => navigate('/addPatient')}>Neuen Patienten hinzufügen</button>
        {patients.length === 0 ? (
          <p>Keine Patienten gefunden.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Aktionen</th>
                <th>Vorname</th>
                <th>Nachname</th>
                <th>Geschlecht</th>
                <th>Geburtsdatum</th>
                <th>Geburtsort</th>
                <th>Email</th>
                <th>Telefonnummer</th>
                <th>Straße</th>
                <th>PLZ</th>
                <th>Ort</th>
                <th>Nationalität</th>
                <th>IBAN</th>
                <th>Versichert Seit</th>
                <th>Versicherungsart</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.versichertennummer}>
                  <td>
                    <button onClick={() => handleEdit(patient.versichertennummer)}>Bearbeiten</button>
                    <button onClick={() => handleDelete(patient.versichertennummer)}>Löschen</button>
                  </td>
                  <td>{patient.vorname}</td>
                  <td>{patient.nachname}</td>
                  <td>{patient.geschlecht}</td>
                  <td>{new Date(patient.geburtsdatum).toLocaleDateString()}</td>
                  <td>{patient.geburtsort}</td>
                  <td>{patient.email}</td>
                  <td>{patient.telefonnummer}</td>
                  <td>{patient.straße}</td>
                  <td>{patient.plz}</td>
                  <td>{patient.ort}</td>
                  <td>{patient.nationalität}</td>
                  <td>{patient.iban}</td>
                  <td>{new Date(patient.versichertSeit).toLocaleDateString()}</td>
                  <td>{patient.versicherungsArt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PatientenTabelle;
