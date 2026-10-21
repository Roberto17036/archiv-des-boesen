document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');

    // Deine persönliche Firebase-Cloud-Datenbank-URL
    const FIREBASE_URL = 'https://firebasedatabase.app';

    // Dein Passwort zum Löschen
    const LOESCH_PASSWORT = 'geheim123';

    // 1. Funktion: Daten aus der weltweiten Cloud-Datenbank laden
    function datenLaden() {
        fetch(FIREBASE_URL)
            .then(response => response.json())
            .then(data => {
                listenElement.innerHTML = ''; // Liste leeren

                if (!data) {
                    listenElement.innerHTML = '<p style="color: #666; text-align: center;">Das weltweite Archiv ist noch leer.</p>';
                    return;
                }

                // Firebase liefert ein Objekt zurück. Wir wandeln es in eine Liste um.
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

                // Lösch-Buttons für die Cloud-Einträge aktivieren
                document.querySelectorAll('.btn-loeschen').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const keyZumLoeschen = e.target.getAttribute('data-key');
                        
                        // Passwort-Abfrage beim Klicken auf Löschen
                        const pwEingabe = prompt('Bitte gib das Administrator-Passwort ein, um diesen Eintrag zu löschen:');
                        
                        if (pwEingabe === LOESCH_PASSWORT) {
                            eintragLoeschen(keyZumLoeschen);
                        } else if (pwEingabe !== null) {
                            alert('Falsches Passwort! Der Eintrag wurde nicht gelöscht.');
                        }
                    });
                });
            })
            .catch(error => console.error('Fehler beim Laden:', error));
    }

    // 2. Funktion: Neuen Eintrag weltweit in die Cloud speichern
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const titelInput = document.getElementById('titel');
        const beschreibungInput = document.getElementById('beschreibung');

        const neuerEintrag = {
            titel: titelInput.value,
            beschreibung: beschreibungInput.value,
            datum: new Date().toLocaleDateString('de-DE')
        };

        // Per POST-Befehl an Firebase senden
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
            datenLaden(); // Liste für alle aktualisieren
        })
        .catch(error => console.error('Fehler beim Speichern:', error));
    });

    // 3. Funktion: Eintrag aus der Cloud löschen
    function eintragLoeschen(key) {
        const loeschUrl = FIREBASE_URL.replace('.json', `/${key}.json`);

        fetch(loeschUrl, {
            method: 'DELETE'
        })
        .then(() => {
            datenLaden(); // Liste aktualisieren
        })
        .catch(error => console.error('Fehler beim Löschen:', error));
    }

    // Beim Start der Seite direkt die weltweiten Daten laden
    datenLaden();
});

    datenLaden();
});
