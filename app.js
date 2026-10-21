document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');

    // Deine feste, funktionierende npoint-Datenbank-URL
    const DATABASE_URL = 'https://npoint.io';

    const LOESCH_PASSWORT = 'geheim123';
    let meinArchiv = [];

    // 1. Funktion: Daten aus der Cloud laden (funktioniert bereits!)
    function datenLaden() {
        fetch(DATABASE_URL, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (!response.ok) throw new Error('Datenbank-Antwort verweigert');
            return response.json();
        })
        .then(data => {
            meinArchiv = Array.isArray(data) ? data : [];
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
            listenElement.innerHTML = '<p style="color: #ff4d4d; text-align: center;">Fehler beim Verbinden mit der npoint-Datenbank.</p>';
        });
    }

    // 2. Funktion: Eintrag in der Cloud speichern (Optimierte Header gegen "Failed to fetch")
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
            mode: 'cors',
            body: JSON.stringify(meinArchiv),
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Speichern fehlgeschlagen: Status ' + response.status);
            return response.json();
        })
        .then(() => {
            titelInput.value = '';
            beschreibungInput.value = '';
            datenLaden();
        })
        .catch(error => {
            console.error('Speicherfehler:', error);
            alert('Fehler beim Speichern: ' + error.message);
        });
    });

    // 3. Funktion: Eintrag aus der Cloud löschen
    function eintragLoeschen(index) {
        meinArchiv.splice(index, 1);

        fetch(DATABASE_URL, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(meinArchiv),
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(() => {
            datenLaden();
        })
        .catch(error => alert('Fehler beim Löschen: ' + error.message));
    }

    datenLaden();
});
