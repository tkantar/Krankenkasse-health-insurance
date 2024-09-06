import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; 
import { Link } from 'react-router-dom';

function Mitarbeiter({ user, handleLogout }) {
  const [mitarbeiterData, setMitarbeiterData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Current user in Mitarbeiter.js:', user); // Debugging hinzufügen

    const fetchMitarbeiterData = async () => {
      if (!user || !user.email) {
        setError('Benutzerinformationen fehlen. Bitte melden Sie sich erneut an.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/mitarbeiter/me?email=${user.email}`, { 
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 403) {
            setError('Zugriff verweigert. Überprüfen Sie Ihre Berechtigungen.');
          } else {
            setError('Fehler beim Abrufen der Mitarbeiterdaten.');
          }
          return;
        }

        const data = await response.json();
        setMitarbeiterData(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Mitarbeiterdaten:', error);
        setError('Netzwerkfehler oder Server ist nicht erreichbar.');
      }
    };

    fetchMitarbeiterData();
  }, [user]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!mitarbeiterData) {
    return <p>Laden...</p>;
  }

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <div style={{ padding: '20px' }}>
        <h2>Mitarbeiter Profil</h2>
        <p>Vorname: {mitarbeiterData.vorname}</p>
        <p>Nachname: {mitarbeiterData.nachname}</p>
        <p>Geschlecht: {mitarbeiterData.geschlecht}</p>
        <p>Geburtsdatum: {mitarbeiterData.geburtsdatum}</p>
        <p>Geburtsort: {mitarbeiterData.geburtsort}</p>
        <p>Email: {mitarbeiterData.email}</p>
        <p>Telefonnummer: {mitarbeiterData.telefonnummer}</p>
        <p>Straße: {mitarbeiterData.straße}</p>
        <p>PLZ: {mitarbeiterData.plz}</p>
        <p>Ort: {mitarbeiterData.ort}</p>
        <p>Nationalität: {mitarbeiterData.nationalität}</p>
        <p>IBAN: {mitarbeiterData.iban}</p>
        <p>Mitarbeiternummer: {mitarbeiterData.mitarbeiternummer}</p>
        <p>Angestellt seit: {mitarbeiterData.angestelltSeit}</p>
        <p>Steueridentifikationsnummer: {mitarbeiterData.steueridentifikationsnummer}</p>
        <p>Steuerklasse: {mitarbeiterData.steuerklasse}</p>
        <p>Gehalt: {mitarbeiterData.gehalt} EUR</p>
      </div>
    </div>
  );
}

export default Mitarbeiter;
