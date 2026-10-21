// KORREKTUR: Import über die exakte www.gstatic.com Adresse gegen den CORS-Fehler
import { initializeApp } from "https://gstatic.com";
import { getDatabase, ref, push, onValue, remove } from "https://gstatic.com";

const form = document.getElementById('archiv-form');
const listenElement = document.getElementById('archiv-liste');
const LOESCH_PASSWORT = 'geheim123';

// Deine exakte Firebase-Verbindung
const firebaseConfig = {
    databaseURL: "https://firebasedatabase.app"
};

// Firebase starten
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const eintraegeRef = ref(database, 'eintraege');

// 1. Live-Empfänger: Aktualisiert die Seite SOFORT, wenn weltweit Daten eingegeben oder gelöscht werden
onValue(eintraegeRef, (snapshot) => {
    listenElement.innerHTML = ''; // Liste leeren
    const data = snapshot.val();

    if (!data) {
        listenElement.innerHTML = '<p style="color: #666; text-align: center;">Das weltweite Live-Archiv ist noch leer.</p>';
        return;
    }

    // Die Einträge aus der Cloud im HTML darstellen
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

    // Lösch-Buttons mit Passwortschutz aktivieren
    document.querySelectorAll('.btn-loeschen').forEach(button => {
        button.addEventListener('click', (e) => {
            const keyZumLoeschen = e.target.getAttribute('data-key');
            const pwEingabe = prompt('Bitte gib das Administrator-Passwort ein, um diesen Eintrag zu löschen:');
            
            if (pwEingabe === LOESCH_PASSWORT) {
                // Löscht den Eintrag direkt aus der weltweiten Cloud
                const eintragMüllRef = ref(database, `eintraege/${keyZumLoeschen}`);
                remove(eintragMüllRef);
            } else if (pwEingabe !== null) {
                alert('Falsches Passwort! Der Eintrag wurde nicht gelöscht.');
            }
        });
    });
});

// 2. Sender: Speichert Daten direkt in die weltweite Cloud
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const titelInput = document.getElementById('titel');
    const beschreibungInput = document.getElementById('beschreibung');

    const neuerEintrag = {
        titel: titelInput.value,
        beschreibung: beschreibungInput.value,
        datum: new Date().toLocaleDateString('de-DE')
    };

    // In Firebase pushen
    push(eintraegeRef)
        .then(() => {
            titelInput.value = '';
            beschreibungInput.value = '';
        })
        .catch(error => {
            console.error('Fehler beim Speichern:', error);
            alert('Speicherfehler! Bitte prüfe deine Firebase-Regeln.');
        });
});
