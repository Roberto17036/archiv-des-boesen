document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');

    // Das Passwort zum Löschen
    const LOESCH_PASSWORT = 'geheim123';

    // Offizielle Firebase-Konfiguration
    const firebaseConfig = {
        databaseURL: "https://archiv-des-boesen-default-rtdb.europe-west1.firebasedatabase.app/"
    };

    // Firebase initialisieren
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    const eintraegeRef = database.ref('eintraege');

    // 1. Funktion: Live-Daten aus Firebase empfangen
    eintraegeRef.on('value', (snapshot) => {
        listenElement.innerHTML = ''; // Liste leeren
        const data = snapshot.val();

        if (!data) {
            listenElement.innerHTML = '<p style="color: #666; text-align: center;">Das weltweite Archiv ist noch leer.</p>';
            return;
        }

        // Einträge darstellen
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

        // Lösch-Buttons aktivieren
        document.querySelectorAll('.btn-loeschen').forEach(button => {
            button.addEventListener('click', (e) => {
                const keyZumLoeschen = e.target.getAttribute('data-key');
                const pwEingabe = prompt('Bitte gib das Administrator-Passwort ein, um diesen Eintrag zu löschen:');
                
                if (pwEingabe === LOESCH_PASSWORT) {
                    eintraegeRef.child(keyZumLoeschen).remove();
                } else if (pwEingabe !== null) {
                    alert('Falsches Passwort! Der Eintrag wurde nicht gelöscht.');
                }
            });
        });
    });

    // 2. Funktion: Eintrag weltweit in die Cloud speichern
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const titelInput = document.getElementById('titel');
        const beschreibungInput = document.getElementById('beschreibung');

        const neuerEintrag = {
            titel: titelInput.value,
            beschreibung: beschreibungInput.value,
            datum: new Date().toLocaleDateString('de-DE')
        };

        // Über das offizielle SDK in Firebase speichern
        eintraegeRef.push(neuerEintrag)
            .then(() => {
                titelInput.value = '';
                beschreibungInput.value = '';
            })
            .catch(error => console.error('Fehler beim Speichern:', error));
    });
});
