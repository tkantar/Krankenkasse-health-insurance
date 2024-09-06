import React, { useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

function AddPraxisMitarbeiter({ user, handleLogout }) {
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
    angestelltSeit: '',
    abteilung: '',
    position: '',
    steueridentifikationsnummer: '',
    steuerklasse: '',
    gehalt: '',
    password: '' // Neues Feld für das Passwort hinzugefügt
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
      const response = await fetch('http://localhost:8080/api/praxisMitarbeiter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(praxisMitarbeiterData)
      });

      if (!response.ok) {
        throw new Error('Fehler beim Erstellen des PraxisMitarbeiters');
      }

      const data = await response.json();
      setMessage('PraxisMitarbeiter erfolgreich hinzugefügt!');
      setPraxisMitarbeiterData({
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
        angestelltSeit: '',
        abteilung: '',
        position: '',
        steueridentifikationsnummer: '',
        steuerklasse: '',
        gehalt: '',
        password: '' // Passwort zurücksetzen
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <div style={{ padding: '20px' }}>
        <h2>Neuen PraxisMitarbeiter hinzufügen</h2>
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
            type="date"
            name="angestelltSeit"
            placeholder="Angestellt seit"
            value={praxisMitarbeiterData.angestelltSeit}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="abteilung"
            placeholder="Abteilung"
            value={praxisMitarbeiterData.abteilung}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={praxisMitarbeiterData.position}
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
            type="text"
            name="steuerklasse"
            placeholder="Steuerklasse"
            value={praxisMitarbeiterData.steuerklasse}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="gehalt"
            placeholder="Gehalt"
            value={praxisMitarbeiterData.gehalt}
            onChange={handleChange}
            required
          />
          {/* Neues Passwortfeld */}
          <input
            type="password"
            name="password"
            placeholder="Passwort"
            value={praxisMitarbeiterData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">PraxisMitarbeiter hinzufügen</button>

          <br/><br/>
          <Link to="/mitarbeiter/PraxisMitarbeiterTabelle">Zurück zur PraxisMitarbeiter Verwaltung</Link><br/>
        </form>
      </div>
    </div>
  );
}

export default AddPraxisMitarbeiter;
