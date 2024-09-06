import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';

function PraxisMitarbeiterTabelle({ user, handleLogout }) {
    const [praxisMitarbeiter, setPraxisMitarbeiter] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchPraxisMitarbeiter = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/praxisMitarbeiter', {
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
              setError('Fehler beim Abrufen der PraxisMitarbeiter-Daten.');
            }
            return;
          }
  
          const data = await response.json();
          setPraxisMitarbeiter(data);
        } catch (error) {
          console.error('Fehler beim Abrufen der PraxisMitarbeiter-Daten:', error);
          setError('Netzwerkfehler oder Server ist nicht erreichbar.');
        }
      };
  
      fetchPraxisMitarbeiter();
    }, [user]);
  
    const handleDelete = async (praxisMitarbeiternummer) => {
      try {
        const response = await fetch(`http://localhost:8080/api/praxisMitarbeiter/${praxisMitarbeiternummer}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Fehler beim Löschen des PraxisMitarbeiters');
        }
  
        // Aktualisiere die Tabelle nach dem Löschen
        setPraxisMitarbeiter(praxisMitarbeiter.filter((pm) => pm.praxisMitarbeiternummer !== praxisMitarbeiternummer));
      } catch (error) {
        console.error('Fehler beim Löschen des PraxisMitarbeiters:', error);
        setError('Fehler beim Löschen des PraxisMitarbeiters.');
      }
    };
  
    const handleEdit = (praxisMitarbeiternummer) => {
      navigate(`/mitarbeiter/editPraxisMitarbeiter/${praxisMitarbeiternummer}`);
    };
  
    if (error) {
      return <p>{error}</p>;
    }
  
    return (
      <div>
        <Header user={user} handleLogout={handleLogout} />
        <Link to="/mitarbeiter/addPraxisMitarbeiter">Neuen PraxisMitarbeiter hinzufügen</Link>
        <div style={{ padding: '20px' }}>
          <h2>PraxisMitarbeiter Tabelle</h2>
          {praxisMitarbeiter.length === 0 ? (
            <p>Keine PraxisMitarbeiter gefunden.</p>
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
                  <th>Angestellt Seit</th>
                  <th>Tätigkeit</th>
                  <th>Steueridentifikationsnummer</th>
                  <th>Steuerklasse</th>
                  <th>Gehalt</th>
                </tr>
              </thead>
              <tbody>
                {praxisMitarbeiter.map((pm) => (
                  <tr key={pm.praxisMitarbeiternummer}>
                    <td>
                      <button onClick={() => handleEdit(pm.praxisMitarbeiternummer)}>Bearbeiten</button>
                      <button onClick={() => handleDelete(pm.praxisMitarbeiternummer)}>Löschen</button>
                    </td>
                    <td>{pm.vorname}</td>
                    <td>{pm.nachname}</td>
                    <td>{pm.geschlecht}</td>
                    <td>{new Date(pm.geburtsdatum).toLocaleDateString()}</td>
                    <td>{pm.geburtsort}</td>
                    <td>{pm.email}</td>
                    <td>{pm.telefonnummer}</td>
                    <td>{pm.straße}</td>
                    <td>{pm.plz}</td>
                    <td>{pm.ort}</td>
                    <td>{pm.nationalität}</td>
                    <td>{pm.iban}</td>
                    <td>{new Date(pm.angestelltSeit).toLocaleDateString()}</td>
                    <td>{pm.taetigkeit}</td>
                    <td>{pm.steueridentifikationsnummer}</td>
                    <td>{pm.steuerklasse}</td>
                    <td>{pm.gehalt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
  
  export default PraxisMitarbeiterTabelle;