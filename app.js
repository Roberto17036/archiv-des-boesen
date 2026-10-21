// Funktion, um Skripte dynamisch und in der richtigen Reihenfolge zu laden
function scriptLaden(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Zuerst die Firebase-Bibliotheken nacheinander laden
Promise.all([
    scriptLaden("https://gstatic.com")
])
.then(() => {
    // Wenn die App-Basis geladen ist, die Datenbank-Erweiterung laden
    return scriptLaden("https://gstatic.com");
})
.then(() => {
    // Erst JETZT, wenn alles da ist, startet die eigentliche Logik
    console.log("Firebase erfolgreich im Hintergrund geladen!");
    datenbankStarten();
})
.catch(error => {
    console.error("Fehler beim Laden der Firebase-Skripte:", error);
});

// Die Hauptfunktion für deine Webseite
function datenbankStarten() {
    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');
    const LOESCH_PASSWORT = 'geheim123';

    // Offizielle Firebase-Konfiguration
    const firebaseConfig = {
        databaseURL: "https://firebasedatabase.app"
    };

    // Firebase initialisieren
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    const eintraegeRef = database.ref('eintraege');

    // 1. Live-Daten aus Firebase empfangen
    eintraegeRef.on('value', (snapshot) => {
        listenElement.innerHTML = ''; 
        const data = snapshot.val();

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
                    eintraegeRef.child(keyZumLoeschen).remove();
                } else if (pwEingabe !== null) {
                    alert('Falsches Passwort! Der Eintrag wurde nicht gelöscht.');
                }
            });
        });
    });

    // 2. Eintrag speichern
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const titelInput = document.getElementById('titel');
        const beschreibungInput = document.getElementById('beschreibung');

        const neuerEintrag = {
            titel: titelInput.value,
            beschreibung: beschreibungInput.value,
            datum: new Date().toLocaleDateString('de-DE')
        };

        eintraegeRef.push(neuerEintrag)
            .then(() => {
                titelInput.value = '';
                beschreibungInput.value = '';
            })
            .catch(error => console.error('Fehler beim Speichern:', error));
    });
}
