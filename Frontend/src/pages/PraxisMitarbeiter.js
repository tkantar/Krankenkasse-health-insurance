import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

function PraxisMitarbeiter({ user, handleLogout }) {
  const [praxisMitarbeiterData, setPraxisMitarbeiterData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPraxisMitarbeiterData = async () => {
      if (!user || !user.email) {
        setError('Benutzerinformationen fehlen. Bitte melden Sie sich erneut an.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/praxisMitarbeiter/me?email=${user.email}`, { 
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
            setError('Fehler beim Abrufen der PraxisMitarbeiterdaten.');
          }
          return;
        }

        const data = await response.json();
        setPraxisMitarbeiterData(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der PraxisMitarbeiterdaten:', error);
        setError('Netzwerkfehler oder Server ist nicht erreichbar.');
      }
    };

    fetchPraxisMitarbeiterData();
  }, [user]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!praxisMitarbeiterData) {
    return <p>Laden...</p>;
  }

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <div style={{ padding: '20px' }}>
        <h2>PraxisMitarbeiter Profil</h2>
        <p>Vorname: {praxisMitarbeiterData.vorname}</p>
        <p>Nachname: {praxisMitarbeiterData.nachname}</p>
        <p>Geschlecht: {praxisMitarbeiterData.geschlecht}</p>
        <p>Geburtsdatum: {praxisMitarbeiterData.geburtsdatum}</p>
        <p>Geburtsort: {praxisMitarbeiterData.geburtsort}</p>
        <p>Email: {praxisMitarbeiterData.email}</p>
        <p>Telefonnummer: {praxisMitarbeiterData.telefonnummer}</p>
        <p>Straße: {praxisMitarbeiterData.straße}</p>
        <p>PLZ: {praxisMitarbeiterData.plz}</p>
        <p>Ort: {praxisMitarbeiterData.ort}</p>
        <p>Nationalität: {praxisMitarbeiterData.nationalität}</p>
        <p>IBAN: {praxisMitarbeiterData.iban}</p>
        <p>Angestellt seit: {praxisMitarbeiterData.angestelltSeit}</p>
        <p>Abteilung: {praxisMitarbeiterData.abteilung}</p>
        <p>Position: {praxisMitarbeiterData.position}</p>
        <p>Steueridentifikationsnummer: {praxisMitarbeiterData.steueridentifikationsnummer}</p>
        <p>Steuerklasse: {praxisMitarbeiterData.steuerklasse}</p>
        <p>Gehalt: {praxisMitarbeiterData.gehalt} EUR</p>
        {/* Fügen Sie alle zusätzlichen Felder hier hinzu */}
      </div>
    </div>
  );
}

export default PraxisMitarbeiter;
