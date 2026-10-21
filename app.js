document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');
    const speichernBtn = document.getElementById('btn-speichern');

    // =========================================================================
    // CLOUD-DATENBANK KONFIGURATION (JSONBin.io v3 API)
    // =========================================================================
    const BIN_ID = '6ad88424ac6210605a451855';
    const dollar = String.fromCharCode(36);
    const MASTER_KEY = dollar + '2a' + dollar + '10' + dollar + 'j8SdQmHLglHfQa9O3s./YuXHtf/cYQ3Zjqs0nk3sWx4Bv19KCcUx2';

    // WICHTIG: Die vollständige, ungekürzte JSONBin v3 URL
    const DATABASE_URL = 'https://api.jsonbin.io/v3/b/' + BIN_ID;// Beim Laden der Seite direkt die Datenbank-Logik starten
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

    const LOESCH_PASSWORT = 'geheim123';

    let meinArchiv = [];
    let letzterDatenHash = '';
    let istAmSpeichern = false;

    // Falls die Live-Status-Leiste noch nicht im HTML existiert, automatisch einfügen
    let statusIndicator = document.getElementById('status-indicator');
    let statusText = document.getElementById('status-text');
    let refreshBtn = document.getElementById('btn-refresh');

    if (!document.getElementById('live-status-bar') && form && form.parentNode) {
        const statusBar = document.createElement('div');
        statusBar.id = 'live-status-bar';
        statusBar.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:10px;background:#1a1212;border:1px solid #331414;border-radius:8px;padding:10px 14px;margin-bottom:25px;font-size:0.85rem;color:#b3b3b3;';
        statusBar.innerHTML = `
            <span id="status-indicator" style="width:10px;height:10px;border-radius:50%;display:inline-block;background:#eab308;box-shadow:0 0 8px #eab308;flex-shrink:0;"></span>
            <span id="status-text" style="flex:1;">Verbinde mit weltweiter Live-Datenbank...</span>
            <button type="button" id="btn-refresh" style="background:#241818;color:#ff8080;border:1px solid #4d1f1f;border-radius:6px;padding:5px 10px;font-size:0.8rem;cursor:pointer;width:auto;">↻ Aktualisieren</button>
        `;
        form.parentNode.insertBefore(statusBar, form);
        statusIndicator = document.getElementById('status-indicator');
        statusText = document.getElementById('status-text');
        refreshBtn = document.getElementById('btn-refresh');
    }

    // Hilfsfunktion: HTML-Sonderzeichen entschärfen (Schutz vor Darstellungsfehlern)
    function escapeHtml(text) {
        if (!text) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Hilfsfunktion: Status-Anzeige aktualisieren
    function setzeStatus(typ, nachricht) {
        if (statusIndicator) {
            statusIndicator.className = 'status-dot ' + typ;
            if (typ === 'online') {
                statusIndicator.style.background = '#22c55e';
                statusIndicator.style.boxShadow = '0 0 8px #22c55e';
            } else if (typ === 'syncing') {
                statusIndicator.style.background = '#eab308';
                statusIndicator.style.boxShadow = '0 0 8px #eab308';
            } else {
                statusIndicator.style.background = '#ef4444';
                statusIndicator.style.boxShadow = '0 0 8px #ef4444';
            }
        }
        if (statusText) {
            statusText.textContent = nachricht;
        }
    }

    // Hilfsfunktion: Extrahiert das Array sicher aus der JSONBin-Antwort
    function extrahiereEintraege(resBody) {
        const record = resBody && resBody.record !== undefined ? resBody.record : resBody;
        if (Array.isArray(record)) {
            return record;
        }
        if (record && Array.isArray(record.eintraege)) {
            return record.eintraege;
        }
        return [];
    }

    // 1. Funktion: Liste auf dem Bildschirm anzeigen (ohne Flackern)
    function ansichtRendern(erzwingen = false) {
        const aktuellerHash = JSON.stringify(meinArchiv);
        if (!erzwingen && aktuellerHash === letzterDatenHash) {
            return;
        }
        letzterDatenHash = aktuellerHash;

        const anzahlBadge = document.getElementById('eintraege-anzahl');
        if (anzahlBadge) {
            anzahlBadge.textContent = String(meinArchiv.length);
        }

        listenElement.innerHTML = '';

        if (meinArchiv.length === 0) {
            listenElement.innerHTML = '<p style="color: #888; text-align: center; padding: 20px 0;">Das weltweite Live-Archiv ist noch leer.</p>';
            return;
        }

        // Neueste Einträge zuerst anzeigen (mit Original-Index für das Löschen)
        const eintraegeMitIndex = meinArchiv.map((eintrag, index) => ({ eintrag, index })).reverse();

        eintraegeMitIndex.forEach(({ eintrag, index }) => {
            const titel = escapeHtml(eintrag.titel || 'Unbenannter Eintrag');
            const beschreibung = escapeHtml(eintrag.beschreibung || 'Keine Beschreibung vorhanden.');
            const datum = escapeHtml(eintrag.datum || 'Unbekanntes Datum');
            const autor = eintrag.autor ? ` • Von: <strong>${escapeHtml(eintrag.autor)}</strong>` : '';

            const li = document.createElement('li');
            li.className = 'archiv-item';
            li.innerHTML = `
                <h3 style="padding-right: 85px;">${titel}</h3>
                <p>${beschreibung}</p>
                <small>Registriert am: ${datum}${autor}</small>
                <button type="button" class="btn-loeschen" data-index="${index}">Löschen</button>
            `;
            listenElement.appendChild(li);
        });

        // Lösch-Buttons mit Passwortschutz aktivieren
        document.querySelectorAll('.btn-loeschen').forEach(button => {
            button.addEventListener('click', (e) => {
                const indexZumLoeschen = Number(e.currentTarget.getAttribute('data-index'));
                const pwEingabe = prompt('Bitte gib das Administrator-Passwort ein, um diesen Eintrag weltweit zu löschen:');

                if (pwEingabe === LOESCH_PASSWORT) {
                    eintragLoeschen(indexZumLoeschen);
                } else if (pwEingabe !== null) {
                    alert('Falsches Passwort! Der Eintrag wurde nicht gelöscht.');
                }
            });
        });
    }

    // 2. Funktion: Daten aus der weltweiten Cloud laden
    async function datenLaden(zeigeLadeStatus = false) {
        if (istAmSpeichern) return;

        if (zeigeLadeStatus) {
            setzeStatus('syncing', 'Synchronisiere mit Cloud-Datenbank...');
        }

        try {
            const response = await fetch(`${DATABASE_URL}/latest`, {
                method: 'GET',
                headers: {
                    'X-Master-Key': MASTER_KEY
                },
                cache: 'no-store'
            });

            if (!response.ok) {
                throw new Error(`HTTP-Status ${response.status}`);
            }

            const resBody = await response.json();
            meinArchiv = extrahiereEintraege(resBody);

            // Lokales Backup aktualisieren
            localStorage.setItem('archivDatenBackup', JSON.stringify(meinArchiv));

            ansichtRendern();

            const uhrzeit = new Date().toLocaleTimeString('de-DE');
            setzeStatus('online', `Live verbunden (${meinArchiv.length} Einträge • Stand: ${uhrzeit} Uhr • Auto-Update aktiv)`);
        } catch (error) {
            console.error('Fehler beim Laden aus der Cloud:', error);
            setzeStatus('error', 'Verbindungsfehler – versuche erneut...');

            // Fallback auf lokales Backup, falls kurzzeitig offline
            const backup = localStorage.getItem('archivDatenBackup');
            if (backup && meinArchiv.length === 0) {
                try {
                    meinArchiv = JSON.parse(backup) || [];
                    ansichtRendern(true);
                } catch (_) {}
            }
        }
    }

    // Hilfsfunktion: Komplettes Archiv in die Cloud schreiben
    async function speichereArchivInCloud(neuesArchiv) {
        // JSONBin erlaubt kein komplett leeres Array [], daher als Objekt speichern, falls alle gelöscht wurden
        const payload = neuesArchiv.length > 0 ? neuesArchiv : { eintraege: [] };

        const response = await fetch(DATABASE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': MASTER_KEY
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Speichern fehlgeschlagen (Status ${response.status})`);
        }
        return await response.json();
    }

    // 3. Funktion: Neuen Eintrag weltweit in der Cloud speichern
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const autorInput = document.getElementById('autor');
        const titelInput = document.getElementById('titel');
        const beschreibungInput = document.getElementById('beschreibung');

        const titel = titelInput ? titelInput.value.trim() : '';
        const beschreibung = beschreibungInput ? beschreibungInput.value.trim() : '';
        const autor = autorInput ? autorInput.value.trim() : '';

        if (!titel || !beschreibung) return;

        const jetzt = new Date();
        const neuerEintrag = {
            titel: titel,
            beschreibung: beschreibung,
            datum: `${jetzt.toLocaleDateString('de-DE')} (${jetzt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr)`
        };
        if (autor) {
            neuerEintrag.autor = autor;
        }

        istAmSpeichern = true;
        const originalBtnText = speichernBtn ? speichernBtn.textContent : 'Eintrag speichern';
        if (speichernBtn) {
            speichernBtn.disabled = true;
            speichernBtn.textContent = 'Wird weltweit gespeichert...';
        }
        setzeStatus('syncing', 'Sende neuen Eintrag an die Cloud...');

        try {
            // Zuerst den allerneuesten Stand aus der Cloud abrufen, damit keine Einträge anderer Nutzer überschrieben werden!
            const latestResp = await fetch(`${DATABASE_URL}/latest`, {
                method: 'GET',
                headers: { 'X-Master-Key': MASTER_KEY },
                cache: 'no-store'
            });

            if (latestResp.ok) {
                const latestData = await latestResp.json();
                meinArchiv = extrahiereEintraege(latestData);
            }

            // Neuen Eintrag hinzufügen und weltweit speichern
            meinArchiv.push(neuerEintrag);
            await speichereArchivInCloud(meinArchiv);

            // Formular leeren
            titelInput.value = '';
            beschreibungInput.value = '';

            ansichtRendern(true);
            const uhrzeit = new Date().toLocaleTimeString('de-DE');
            setzeStatus('online', `Eintrag veröffentlicht! (${meinArchiv.length} Einträge • Stand: ${uhrzeit} Uhr)`);
        } catch (error) {
            console.error('Speicherfehler:', error);
            setzeStatus('error', 'Fehler beim Speichern in der Cloud!');
            alert('Fehler beim Speichern. Bitte prüfe deine Internetverbindung und versuche es erneut.');
        } finally {
            istAmSpeichern = false;
            if (speichernBtn) {
                speichernBtn.disabled = false;
                speichernBtn.textContent = originalBtnText;
            }
        }
    });

    // 4. Funktion: Eintrag weltweit aus der Cloud löschen
    async function eintragLoeschen(index) {
        istAmSpeichern = true;
        setzeStatus('syncing', 'Lösche Eintrag weltweit aus der Cloud...');

        try {
            // Aktuellsten Stand holen
            const latestResp = await fetch(`${DATABASE_URL}/latest`, {
                method: 'GET',
                headers: { 'X-Master-Key': MASTER_KEY },
                cache: 'no-store'
            });

            if (latestResp.ok) {
                const latestData = await latestResp.json();
                meinArchiv = extrahiereEintraege(latestData);
            }

            if (index >= 0 && index < meinArchiv.length) {
                meinArchiv.splice(index, 1);
                await speichereArchivInCloud(meinArchiv);
                ansichtRendern(true);
                setzeStatus('online', `Eintrag gelöscht (${meinArchiv.length} Einträge verbleibend).`);
            }
        } catch (error) {
            console.error('Fehler beim Löschen:', error);
            setzeStatus('error', 'Fehler beim Löschen!');
            alert('Fehler beim Löschen: ' + error.message);
        } finally {
            istAmSpeichern = false;
        }
    }

    // Manueller Aktualisierungs-Button
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => datenLaden(true));
    }

    // Sofort aktualisieren, wenn man zum Tab zurückwechselt
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            datenLaden(false);
        }
    });

    // Beim Öffnen der Seite sofort die aktuellen Cloud-Daten laden
    datenLaden(true);

    // Alle 5 Sekunden automatisch im Hintergrund prüfen, ob jemand weltweit etwas Neues eingetragen hat
    setInterval(() => datenLaden(false), 5000);
});
