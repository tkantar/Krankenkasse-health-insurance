import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function EditPatient({ user, handleLogout }) {
  const { versichertennummer } = useParams();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    vorname: '',
    nachname: '',
    geschlecht: '',
    geburtsdatum: '',
    geburtsort: '',
    email: '',
    telefonnummer: '',
    straße: '',
    plz: '',
    ort: '',
    nationalität: '',
    iban: '',
    password: '',
    versichertSeit: '',
    versicherungsArt: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/patient/${versichertennummer}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Fehler beim Laden der Patienten-Daten');
        }

        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Patienten-Daten:', error);
        setError('Fehler beim Abrufen der Patienten-Daten.');
      }
    };

    fetchPatientData();
  }, [versichertennummer, user.token]);

  const handleChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch(`http://localhost:8080/api/patient/${versichertennummer}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(patientData)
      });

      if (!response.ok) {
        throw new Error('Fehler beim Aktualisieren des Patienten');
      }

      setMessage('Patient erfolgreich aktualisiert!');
      setTimeout(() => navigate('/patientenTabelle'), 1500);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Patienten:', error);
      setError('Fehler beim Aktualisieren des Patienten.');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!patientData) {
    return <p>Lade Daten...</p>;
  }

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <div style={{ padding: '20px' }}>
        <h2>Patient bearbeiten</h2>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="vorname"
            placeholder="Vorname"
            value={patientData.vorname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nachname"
            placeholder="Nachname"
            value={patientData.nachname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="geschlecht"
            placeholder="Geschlecht"
            value={patientData.geschlecht}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="geburtsdatum"
            placeholder="Geburtsdatum"
            value={patientData.geburtsdatum}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="geburtsort"
            placeholder="Geburtsort"
            value={patientData.geburtsort}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={patientData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefonnummer"
            placeholder="Telefonnummer"
            value={patientData.telefonnummer}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="straße"
            placeholder="Straße"
            value={patientData.straße}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="plz"
            placeholder="PLZ"
            value={patientData.plz}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="ort"
            placeholder="Ort"
            value={patientData.ort}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nationalität"
            placeholder="Nationalität"
            value={patientData.nationalität}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="iban"
            placeholder="IBAN"
            value={patientData.iban}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Passwort"
            value={patientData.password}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="versichertSeit"
            placeholder="Versichert seit"
            value={patientData.versichertSeit}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="versicherungsArt"
            placeholder="Versicherungsart"
            value={patientData.versicherungsArt}
            onChange={handleChange}
            required
          />
          <button type="submit">Speichern</button>
        </form>
      </div>
    </div>
  );
}

export default EditPatient;
