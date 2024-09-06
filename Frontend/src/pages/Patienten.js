import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

function Patienten({ user, handleLogout }) {
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!user || !user.email) {
        setError('Benutzerinformationen fehlen. Bitte melden Sie sich erneut an.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/patient/me?email=${user.email}`, { 
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
            setError('Fehler beim Abrufen der Patientendaten.');
          }
          return;
        }

        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Patientendaten:', error);
        setError('Netzwerkfehler oder Server ist nicht erreichbar.');
      }
    };

    fetchPatientData();
  }, [user]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!patientData) {
    return <p>Laden...</p>;
  }

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} />
      <div style={{ padding: '20px' }}>
        <h2>Patient Profil</h2>
        <p>Vorname: {patientData.vorname}</p>
        <p>Nachname: {patientData.nachname}</p>
        <p>Geschlecht: {patientData.geschlecht}</p>
        <p>Geburtsdatum: {patientData.geburtsdatum}</p>
        <p>Geburtsort: {patientData.geburtsort}</p>
        <p>Email: {patientData.email}</p>
        <p>Telefonnummer: {patientData.telefonnummer}</p>
        <p>Straße: {patientData.straße}</p>
        <p>PLZ: {patientData.plz}</p>
        <p>Ort: {patientData.ort}</p>
        <p>Nationalität: {patientData.nationalität}</p>
        <p>Versicherungsnummer: {patientData.versicherungsnummer}</p>
        <p>Versicherungsstatus: {patientData.versicherungsstatus}</p>
        <p>Arzt: {patientData.arzt}</p>
        {/* Fügen Sie alle zusätzlichen Felder hier hinzu */}
      </div>
    </div>
  );
}

export default Patienten;
