document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');

    // Deine persönliche Firebase-Cloud-Datenbank-URL
    const FIREBASE_URL = 'https://firebasedatabase.app';
    const LOESCH_PASSWORT = 'geheim123';

    // 1. Funktion: Live-Daten aus der Firebase-Cloud laden
    function datenLaden() {
        fetch(FIREBASE_URL)
            .then(response => {
                if (!response.ok) throw new Error('Datenbank verweigert Zugriff');
                return response.json();
            })
            .then(data => {
                listenElement.innerHTML = ''; // Liste leeren

                if (!data) {
                    listenElement.innerHTML = '<p style="color: #666; text-align: center;">Das weltweite Live-Archiv ist noch leer.</p>';
                    return;
                }

                // Firebase liefert ein Objekt zurück. Wir wandeln es in HTML-Einträge um.
                Object.keys(data).forEach(key => {
                    const eintrag = data[key];
                    const li = document.createElement('li');
                    li.className = 'archiv-item';
                    li.innerHTML = `
                        <h3>${eintrag.titel}</h3>
                        <p>${eintrag.beschreibung}</p>
                        <small>Registriert am: ${eintrag.datum}</small>
                        <button class="btn-loeschen" data-key="${key}">Löschen</button>
                    `;
                    listenElement.appendChild(li);
                });

                // Lösch-Buttons mit Passwortschutz aktivieren
                document.querySelectorAll('.btn-loeschen').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const keyZumLoeschen = e.target.getAttribute('data-key');
                        const pwEingabe = prompt('Bitte gib das Administrator-Passwort ein, um diesen Eintrag zu löschen:');
                        
                        if (pwEingabe === LOESCH_PASSWORT) {
                            eintragLoeschen(keyZumLoeschen);
                        } else if (pwEingabe !== null) {
                            alert('Falsches Passwort! Der Eintrag wurde nicht gelöscht.');
                        }
                    });
                });
            })
            .catch(error => {
                console.error('Fehler beim Laden:', error);
                listenElement.innerHTML = '<p style="color: #ff4d4d; text-align: center;">Verbindungsfehler zur Live-Datenbank.</p>';
            });
    }

    // 2. Funktion: Eintrag weltweit in die Firebase-Cloud speichern
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const titelInput = document.getElementById('titel');
        const beschreibungInput = document.getElementById('beschreibung');

        const neuerEintrag = {
            titel: titelInput.value,
            beschreibung: beschreibungInput.value,
            datum: new Date().toLocaleDateString('de-DE')
        };

        fetch(FIREBASE_URL, {
            method: 'POST',
            body: JSON.stringify(neuerEintrag),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            titelInput.value = '';
            beschreibungInput.value = '';
            datenLaden(); // Ansicht sofort aktualisieren
        })
        .catch(error => console.error('Fehler beim Speichern:', error));
    });

    // 3. Funktion: Eintrag aus der Cloud löschen
    function eintragLoeschen(key) {
        // Die genaue URL des einzelnen Eintrags zum Löschen bestimmen
        const loeschUrl = `https://firebasedatabase.app{key}.json`;

        fetch(loeschUrl, {
            method: 'DELETE'
        })
        .then(() => {
            datenLaden(); // Ansicht nach dem Löschen aktualisieren
        })
        .catch(error => console.error('Fehler beim Löschen:', error));
    }

    // Beim Start direkt die Daten laden
    datenLaden();

    // AUTOMATISCHES UPGRADE: Alle 5 Sekunden prüfen, ob jemand weltweit etwas eingetragen hat
    setInterval(datenLaden, 5000);
});
