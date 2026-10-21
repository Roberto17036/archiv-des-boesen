document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');

    // Versuche die globale Firebase-Alternative (oft resistenter gegen Blocker)
    const FIREBASE_URL = 'https://firebasedatabase.app';

    const LOESCH_PASSWORT = 'geheim123';

    function datenLaden() {
        fetch(FIREBASE_URL)
            .then(response => {
                if (!response.ok) throw new Error('Datenbank-Antwort verweigert');
                return response.json();
            })
            .then(data => {
                listenElement.innerHTML = ''; 

                if (!data) {
                    listenElement.innerHTML = '<p style="color: #666; text-align: center;">Das weltweite Archiv ist noch leer.</p>';
                    return;
                }

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
                // Sollte die obere URL scheitern, versuchen wir automatisch die europäische Variante als Backup
                backupLaden();
            });
    }

    // Backup-Funktion mit der regionalen URL, falls die globale blockiert wird
    function backupLaden() {
        const BACKUP_URL = 'https://firebasedatabase.app';
        fetch(BACKUP_URL)
            .then(res => res.json())
            .then(data => {
                // (Gleiche Logik wie oben für das Backup)
                listenElement.innerHTML = '';
                if (!data) { listenElement.innerHTML = '<p style="color: #666; text-align: center;">Das weltweite Archiv ist noch leer.</p>'; return; }
                Object.keys(data).forEach(key => {
                    const eintrag = data[key];
                    const li = document.createElement('li'); li.className = 'archiv-item';
                    li.innerHTML = `<h3>${eintrag.titel}</h3><p>${eintrag.beschreibung}</p><small>Registriert am: ${eintrag.datum}</small><button class="btn-loeschen" data-key="${key}">Löschen</button>`;
                    listenElement.appendChild(li);
                });
            })
            .catch(() => {
                listenElement.innerHTML = '<p style="color: #ff4d4d; text-align: center;">Verbindungsfehler zur Datenbank. Bitte prüfe deinen AdBlocker/Netzwerk.</p>';
            });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const titelInput = document.getElementById('titel');
        const beschreibungInput = document.getElementById('beschreibung');

        const neuerEintrag = {
            titel: titelInput.value,
            beschreibung: beschreibungInput.value,
            datum: new Date().toLocaleDateString('de-DE')
        };

        // Versuche zuerst an die Haupt-URL zu senden, falls fehlgeschlagen an Backup
        fetch(FIREBASE_URL, {
            method: 'POST',
            body: JSON.stringify(neuerEintrag),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            titelInput.value = ''; beschreibungInput.value = ''; datenLaden();
        })
        .catch(() => {
            // Backup-Speicherung
            fetch('https://firebasedatabase.app', {
                method: 'POST',
                body: JSON.stringify(neuerEintrag),
                headers: { 'Content-Type': 'application/json' }
            }).then(() => { titelInput.value = ''; beschreibungInput.value = ''; datenLaden(); });
        });
    });

    function eintragLoeschen(key) {
        const loeschUrl = FIREBASE_URL.replace('.json', `/${key}.json`);
        fetch(loeschUrl, { method: 'DELETE' }).then(() => datenLaden());
    }

    datenLaden();
});
