document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');

    // Deine npoint-URL
    const DATABASE_URL = 'https://npoint.io';
    const LOESCH_PASSWORT = 'geheim123';
    
    // Fallback: Daten zuerst lokal laden, falls das Internet blockiert
    let meinArchiv = JSON.parse(localStorage.getItem('archivDatenLocal')) || [];

    // 1. Funktion: Daten darstellen
    function ansichtAktualisieren() {
        listenElement.innerHTML = ''; 

        if (meinArchiv.length === 0) {
            listenElement.innerHTML = '<p style="color: #666; text-align: center;">Das Archiv ist noch leer.</p>';
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
    }

    // 2. Funktion: Daten aus der Cloud laden (mit automatischem Fallback)
    function datenLaden() {
        fetch(DATABASE_URL)
            .then(response => {
                if (!response.ok) throw new Error('Server verweigert Zugriff');
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    meinArchiv = data;
                    localStorage.setItem('archivDatenLocal', JSON.stringify(meinArchiv));
                }
                ansichtAktualisieren();
            })
            .catch(error => {
                console.log('Cloud blockiert (Nutze lokalen Speicher):', error);
                // Wenn die Cloud blockiert, arbeiten wir einfach mit den lokalen Daten weiter
                ansichtAktualisieren();
            });
    }

    // 3. Funktion: Eintrag speichern
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
        
        // Immer lokal sichern
        localStorage.setItem('archivDatenLocal', JSON.stringify(meinArchiv));
        ansichtAktualisieren();

        // Im Hintergrund versuchen, die Cloud zu aktualisieren
        fetch(DATABASE_URL, {
            method: 'PUT',
            body: JSON.stringify(meinArchiv),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(() => {
            titelInput.value = '';
            beschreibungInput.value = '';
        })
        .catch(err => console.log('Synchronisierung verschoben (Lokal gespeichert).'));
        
        // Eingabefelder leeren
        titelInput.value = '';
        beschreibungInput.value = '';
    });

    // 4. Funktion: Eintrag löschen
    function eintragLoeschen(index) {
        meinArchiv.splice(index, 1);
        localStorage.setItem('archivDatenLocal', JSON.stringify(meinArchiv));
        ansichtAktualisieren();

        // Im Hintergrund an Cloud senden
        fetch(DATABASE_URL, {
            method: 'PUT',
            body: JSON.stringify(meinArchiv),
            headers: { 'Content-Type': 'application/json' }
        }).catch(err => console.log('Löschen in der Cloud verschoben.'));
    }

    // Direkt beim Start laden
    datenLaden();
});
