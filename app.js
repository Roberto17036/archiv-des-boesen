// Beim Laden der Seite direkt die Datenbank-Logik starten
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');

    // 1. Daten aus dem LocalStorage des Browsers laden (oder leeres Array)
    let meinArchiv = JSON.parse(localStorage.getItem('archivDaten')) || [];

    // 2. Funktion: Liste auf der Webseite neu zeichnen
    function ansichtAktualisieren() {
        listenElement.innerHTML = ''; // Liste leeren

        if (meinArchiv.length === 0) {
            listenElement.innerHTML = '<p style="color: #666; text-align: center;">Das Archiv ist noch leer.</p>';
            return;
        }

        // Jeden Eintrag aus der Datenbank durchgehen und anzeigen
        meinArchiv.forEach(eintrag => {
            const li = document.createElement('li');
            li.className = 'archiv-item';
            li.innerHTML = `
                <h3>${eintrag.titel}</h3>
                <p>${eintrag.beschreibung}</p>
                <small>Registriert am: ${eintrag.datum}</small>
                <button class="btn-loeschen" data-id="${eintrag.id}">Löschen</button>
            `;
            listenElement.appendChild(li);
        });

        // Lösch-Buttons aktivieren
        document.querySelectorAll('.btn-loeschen').forEach(button => {
            button.addEventListener('click', (e) => {
                const idZumLoeschen = Number(e.target.getAttribute('data-id'));
                eintragLoeschen(idZumLoeschen);
            });
        });
    }

    // 3. Funktion: Neuen Eintrag hinzufügen
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Verhindert das Neuladen der Seite

        const titelInput = document.getElementById('titel');
        const beschreibungInput = document.getElementById('beschreibung');

        const neuerEintrag = {
            id: Date.now(), // Einmalige ID erzeugen
            titel: titelInput.value,
            beschreibung: beschreibungInput.value,
            datum: new Date().toLocaleDateString('de-DE')
        };

        // Eintrag ins Array packen
        meinArchiv.push(neuerEintrag);

        // Im Browser-Speicher sichern
        localStorage.setItem('archivDaten', JSON.stringify(meinArchiv));

        // Formular leeren und Ansicht aktualisieren
        titelInput.value = '';
        beschreibungInput.value = '';
        ansichtAktualisieren();
    });

    // 4. Funktion: Eintrag löschen
    function eintragLoeschen(id) {
        meinArchiv = meinArchiv.filter(eintrag => eintrag.id !== id);
        localStorage.setItem('archivDaten', JSON.stringify(meinArchiv));
        ansichtAktualisieren();
    }

    // Erste Anzeige beim Öffnen der Webseite
    ansichtAktualisieren();
});
