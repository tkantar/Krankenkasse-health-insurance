import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate importieren
import Header from '../components/Header';

function EditPraxisMitarbeiter({ user, handleLogout }) {
  const { praxisMitarbeiternummer } = useParams();
  const navigate = useNavigate(); // useNavigate-Hook initialisieren
  const [praxisMitarbeiterData, setPraxisMitarbeiterData] = useState({
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
    angestelltSeit: '',
    taetigkeit: '',
    steueridentifikationsnummer: '',
    steuerklasse: '',
    gehalt: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPraxisMitarbeiterData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/praxisMitarbeiter/${praxisMitarbeiternummer}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Fehler beim Laden der PraxisMitarbeiter-Daten');
        }

        const data = await response.json();
        setPraxisMitarbeiterData(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der PraxisMitarbeiter-Daten:', error);
        setError('Fehler beim Abrufen der PraxisMitarbeiter-Daten.');
      }
    };

    fetchPraxisMitarbeiterData();
  }, [praxisMitarbeiternummer, user.token]);

  const handleChange = (e) => {
    setPraxisMitarbeiterData({
      ...praxisMitarbeiterData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch(`http://localhost:8080/api/praxisMitarbeiter/${praxisMitarbeiternummer}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(praxisMitarbeiterData)
      });

      if (!response.ok) {
        throw new Error('Fehler beim Aktualisieren des PraxisMitarbeiters');
      }

      setMessage('PraxisMitarbeiter erfolgreich aktualisiert!');
      setTimeout(() => navigate('/mitarbeiter/praxisMitarbeiterTabelle'), 1500); // Nach dem Speichern navigieren
    } catch (error) {
      console.error('Fehler beim Aktualisieren des PraxisMitarbeiters:', error);
      setError('Fehler beim Aktualisieren des PraxisMitarbeiters.');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!praxisMitarbeiterData) {
    return <p>Lade Daten...</p>;
  }

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <div style={{ padding: '20px' }}>
        <h2>PraxisMitarbeiter bearbeiten</h2>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="vorname"
            placeholder="Vorname"
            value={praxisMitarbeiterData.vorname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nachname"
            placeholder="Nachname"
            value={praxisMitarbeiterData.nachname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="geschlecht"
            placeholder="Geschlecht"
            value={praxisMitarbeiterData.geschlecht}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="geburtsdatum"
            placeholder="Geburtsdatum"
            value={praxisMitarbeiterData.geburtsdatum}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="geburtsort"
            placeholder="Geburtsort"
            value={praxisMitarbeiterData.geburtsort}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={praxisMitarbeiterData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefonnummer"
            placeholder="Telefonnummer"
            value={praxisMitarbeiterData.telefonnummer}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="straße"
            placeholder="Straße"
            value={praxisMitarbeiterData.straße}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="plz"
            placeholder="PLZ"
            value={praxisMitarbeiterData.plz}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="ort"
            placeholder="Ort"
            value={praxisMitarbeiterData.ort}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nationalität"
            placeholder="Nationalität"
            value={praxisMitarbeiterData.nationalität}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="iban"
            placeholder="IBAN"
            value={praxisMitarbeiterData.iban}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Passwort"
            value={praxisMitarbeiterData.password}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="angestelltSeit"
            placeholder="Angestellt seit"
            value={praxisMitarbeiterData.angestelltSeit}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="taetigkeit"
            placeholder="Tätigkeit"
            value={praxisMitarbeiterData.taetigkeit}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="steueridentifikationsnummer"
            placeholder="Steueridentifikationsnummer"
            value={praxisMitarbeiterData.steueridentifikationsnummer}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="steuerklasse"
            placeholder="Steuerklasse"
            value={praxisMitarbeiterData.steuerklasse}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            step="0.01"
            name="gehalt"
            placeholder="Gehalt"
            value={praxisMitarbeiterData.gehalt}
            onChange={handleChange}
            required
          />
          <button type="submit">Speichern</button>
        </form>
      </div>
    </div>
  );
}

export default EditPraxisMitarbeiter;
