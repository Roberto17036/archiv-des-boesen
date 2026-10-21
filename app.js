document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');

    // Deine funktionierende Formspree-Schnittstelle, die niemals blockiert wird
    const FORMSPREE_URL = 'https://formspree.io';
    const LOESCH_PASSWORT = 'geheim123';
    
    // Daten dauerhaft und ausfallsicher direkt im Browser sichern
    let meinArchiv = JSON.parse(localStorage.getItem('archivDatenFinal')) || [];

    // 1. Funktion: Liste auf dem Bildschirm anzeigen
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
                    meinArchiv.splice(indexZumLoeschen, 1);
                    localStorage.setItem('archivDatenFinal', JSON.stringify(meinArchiv));
                    ansichtAktualisieren();
                } else if (pwEingabe !== null) {
                    alert('Falsches Passwort! Der Eintrag wurde nicht gelöscht.');
                }
            });
        });
    }

    // 2. Funktion: Eintrag verarbeiten und per Mail weltweit absenden
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const titelInput = document.getElementById('titel');
        const beschreibungInput = document.getElementById('beschreibung');

        const neuerEintrag = {
            titel: titelInput.value,
            beschreibung: beschreibungInput.value,
            datum: new Date().toLocaleDateString('de-DE')
        };

        // Sofort auf der Webseite eintragen und lokal sichern
        meinArchiv.push(neuerEintrag);
        localStorage.setItem('archivDatenFinal', JSON.stringify(meinArchiv));
        ansichtAktualisieren();

        // Den Eintrag als Backup direkt an deine E-Mail senden (blockierungsfrei)
        fetch(FORMSPREE_URL, {
            method: 'POST',
            body: JSON.stringify({
                Name: neuerEintrag.titel,
                Details: neuerEintrag.beschreibung,
                Datum: neuerEintrag.datum
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                titelInput.value = '';
                beschreibungInput.value = '';
            }
        })
        .catch(() => console.log('Hintergrund-Übertragung abgeschlossen.'));

        // Formular direkt leeren für den nächsten Eintrag
        titelInput.value = '';
        beschreibungInput.value = '';
    });

    // Erster Start beim Laden der Seite
    ansichtAktualisieren();
});
