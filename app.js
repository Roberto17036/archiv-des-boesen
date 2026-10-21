document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');

    // Deine feste, blockierungsfreie npoint-Datenbank-URL
    const DATABASE_URL = 'https://api.npoint.io/f309c81a5994fed510c7';

    const LOESCH_PASSWORT = 'geheim123';
    let meinArchiv = [];

    // 1. Funktion: Daten aus der Cloud laden
    function datenLaden() {
        fetch(DATABASE_URL)
            .then(response => {
                if (!response.ok) throw new Error('Datenbank-Antwort verweigert');
                return response.json();
            })
            .then(data => {
                // npoint liefert das Array aus der Datei
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

    // 2. Funktion: Eintrag in der Cloud speichern (npoint benötigt PUT zum Updaten des Arrays)
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const titelInput = document.getElementById('titel');
        const beschreibungInput = document.getElementById('beschreibung');

        const neuerEintrag = {
            titel: titelInput.value,
            beschreibung: beschreibungInput.value,
            datum: new Date().toLocaleDateString('de-DE')
        };

        // Eintrag zur lokalen Liste hinzufügen
        meinArchiv.push(neuerEintrag);

        // Die gesamte Liste per PUT an npoint senden
        fetch(DATABASE_URL, {
            method: 'PUT',
            body: JSON.stringify(meinArchiv),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) throw new Error('Speichern fehlgeschlagen');
            return response.json();
        })
        .then(() => {
            titelInput.value = '';
            beschreibungInput.value = '';
            datenLaden(); // Ansicht weltweit aktualisieren
        })
        .catch(error => alert('Fehler beim Speichern: ' + error));
    });

    // 3. Funktion: Eintrag aus der Cloud löschen
    function eintragLoeschen(index) {
        // Eintrag aus dem Array entfernen
        meinArchiv.splice(index, 1);

        // Aktualisierte Liste per PUT zurück an npoint senden
        fetch(DATABASE_URL, {
            method: 'PUT',
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
