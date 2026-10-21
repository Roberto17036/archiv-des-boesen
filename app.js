document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');

    // Deine feste jsonbin.io Cloud-Datenbank
    const BIN_ID = '6ad88424ac6210605a451855';
    
    // Absolut sichere Generierung des Schlüssels ohne Dollar-Zeichen-Kopierfehler
    const dollar = String.fromCharCode(36); 
    const MASTER_KEY = dollar + "2a" + dollar + "10" + dollar + "j8SdQmHLglHfQa9O3s./YuXHtf/cYQ3Zjqs0nk3sWx4Bv19KCcUx2";

    const DATABASE_URL = `https://jsonbin.io{BIN_ID}`;
    const LOESCH_PASSWORT = 'geheim123';
    let meinArchiv = [];

    // 1. Funktion: Daten aus der weltweiten Cloud laden
    function datenLaden() {
        fetch(`${DATABASE_URL}/latest`, {
            method: 'GET',
            headers: {
                'X-Master-Key': MASTER_KEY,
                'Cache-Control': 'no-cache'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Datenbank-Antwort verweigert');
            return response.json();
        })
        .then(resBody => {
            if (resBody && resBody.record) {
                meinArchiv = Array.isArray(resBody.record) ? resBody.record : [];
            } else if (Array.isArray(resBody)) {
                meinArchiv = resBody;
            } else {
                meinArchiv = [];
            }

            listenElement.innerHTML = ''; 

            if (meinArchiv.length === 0) {
                listenElement.innerHTML = '<p style="color: #666; text-align: center;">Das weltweite Archiv ist noch leer.</p>';
                return;
            }

            meinArchiv.forEach((eintrag, index) => {
                const titel = eintrag.titel || 'Unbenannter Eintrag';
                const beschreibung = eintrag.beschreibung || 'Keine Beschreibung vorhanden.';
                const datum = eintrag.datum || 'Unbekanntes Datum';

                const li = document.createElement('li');
                li.className = 'archiv-item';
                li.innerHTML = `
                    <h3>${titel}</h3>
                    <p>${beschreibung}</p>
                    <small>Registriert am: ${datum}</small>
                    <button class="btn-loeschen" data-index="${index}">Löschen</button>
                `;
                listenElement.appendChild(li);
            });

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
            listenElement.innerHTML = '<p style="color: #ff4d4d; text-align: center;">Verbindung zur Cloud wird aufgebaut...</p>';
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

        meinArchiv.push(neuerEintrag);

        fetch(DATABASE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': MASTER_KEY
            },
            body: JSON.stringify(meinArchiv)
        })
        .then(response => {
            if (!response.ok) throw new Error('Speichern fehlgeschlagen');
            return response.json();
        })
        .then(() => {
            titelInput.value = '';
            beschreibungInput.value = '';
            datenLaden();
        })
        .catch(error => {
            console.error('Speicherfehler:', error);
            alert('Fehler beim Speichern. Bitte versuche es erneut.');
        });
    });

    // 3. Funktion: Eintrag aus der Cloud löschen
    function eintragLoeschen(index) {
        meinArchiv.splice(index, 1);

        fetch(DATABASE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': MASTER_KEY
            },
            body: JSON.stringify(meinArchiv)
        })
        .then(() => {
            datenLaden();
        })
        .catch(error => alert('Fehler beim Löschen: ' + error));
    }

    datenLaden();

    // Alle 10 Sekunden im Hintergrund aktualisieren
    setInterval(datenLaden, 10000);
});
