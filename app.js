document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');

    // Deine feste jsonbin.io Cloud-Datenbank
    const BIN_ID = '6ad88109ffd5d160537ec371';
    const MASTER_KEY = '\$2a\$10\$j8SdQmHLglHfQa9O3s./YuXHtf/cYQ3Zjqs0nk3sWx4Bv19KCcUx2';

    const DATABASE_URL = `https://jsonbin.io{BIN_ID}`;
    const LOESCH_PASSWORT = 'geheim123';
    let meinArchiv = [];

    // 1. Funktion: Daten aus der weltweiten Cloud laden
    function datenLaden() {
        fetch(`${DATABASE_URL}/latest`, {
            method: 'GET',
            headers: {
                'X-Master-Key': MASTER_KEY
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Datenbank-Antwort verweigert');
            return response.json();
        })
        .then(resBody => {
            meinArchiv = Array.isArray(resBody.record) ? resBody.record : [];
            listenElement.innerHTML = ''; 

            if (meinArchiv.length === 0) {
                listenElement.innerHTML = '<p style="color: #666; text-align: center;">Das weltweite Archiv ist noch leer.</p>';
                return;
            }

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
            listenElement.innerHTML = '<p style="color: #ff4d4d; text-align: center;">Fehler beim Verbinden mit der Cloud-Datenbank.</p>';
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
        .catch(error => alert('Fehler beim Speichern: ' + error));
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
