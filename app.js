document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');

    // Deine feste, blockierungsfreie npoint-Datenbank-URL
    const DATABASE_URL = 'https://npoint.io';

    const LOESCH_PASSWORT = 'geheim123';
    let meinArchiv = [];

    // 1. Funktion: Daten aus der weltweiten npoint-Cloud laden
    function datenLaden() {
        fetch(DATABASE_URL)
            .then(response => {
                if (!response.ok) throw new Error('Datenbank-Antwort verweigert');
                return response.json();
            })
            .then(data => {
                // Falls die Datenbank leer ist oder kein Array zurückgibt, leeres Array nutzen
                meinArchiv = Array.isArray(data) ? data : [];
                listenElement.innerHTML = ''; 

                if (meinArchiv.length === 0) {
                    listenElement.innerHTML = '<p style="color: #666; text-align: center;">Das weltweite Archiv ist noch leer.</p>';
                    return;
                }

                // Einträge darstellen
                meinArchiv.forEach((eintrag, index) => {
                    const li = document.createElement('li');
                    li.className = 'archiv-item';
                    li.innerHTML = `
                        <h3>${eintrag.titel}</h3>
                        <p>${eintrag.beschreibung}</p>
                        <small>Registriert am: ${eintrag.datum}</small>
                        <button class="btn-loeschen" data-index="${index}">Löschen</button>
                    `;
                    listenElement.appendChild(li);
                });

                // Lösch-Buttons aktivieren
                document.querySelectorAll('.btn-loeschen').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const indexZumLoeschen = Number(e.target.getAttribute('data-index'));
                        const pwEingabe = prompt('Bitte gib das Administrator-Passwort ein, um diesen Eintrag zu löschen:');
                        
                        if (pwEingabe === LOESCH_PASSWORT) {
                            eintragLoeschen(indexZumLoeschen);
                        } else if (pwEingabe !== null) {
                            alert('Falsches Passwort! Der Eintrag wurde nicht gelöscht.');
                        }
                    });
                });
            })
            .catch(error => {
                console.error('Fehler beim Laden:', error);
                listenElement.innerHTML = '<p style="color: #ff4d4d; text-align: center;">Fehler beim Verbinden mit der npoint-Datenbank.</p>';
            });
    }

    // 2. Funktion: Eintrag in der Cloud speichern
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const titelInput = document.getElementById('titel');
        const beschreibungInput = document.getElementById('beschreibung');

        const neuerEintrag = {
            titel: titelInput.value,
            beschreibung: beschreibungInput.value,
            datum: new Date().toLocaleDateString('de-DE')
        };

        // Eintrag lokal hinzufügen
        meinArchiv.push(neuerEintrag);

        // Die gesamte Liste aktualisiert zurück an npoint senden (POST)
        fetch(DATABASE_URL, {
            method: 'POST',
            body: JSON.stringify(meinArchiv),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            titelInput.value = '';
            beschreibungInput.value = '';
            datenLaden(); // Ansicht für alle weltweit aktualisieren
        })
        .catch(error => alert('Fehler beim Speichern: ' + error));
    });

    // 3. Funktion: Eintrag aus der Cloud löschen
    function eintragLoeschen(index) {
        // Eintrag aus dem Array entfernen
        meinArchiv.splice(index, 1);

        // Aktualisierte Liste zurück an die Cloud senden
        fetch(DATABASE_URL, {
            method: 'POST',
            body: JSON.stringify(meinArchiv),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            datenLaden();
        })
        .catch(error => alert('Fehler beim Löschen: ' + error));
    }

    // Beim Start direkt laden
    datenLaden();
});
