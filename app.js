document.addEventListener('DOMContentLoaded', () => {
    // 0. Automatische Bereinigung doppelter Container & Grid-Sicherung
    const alleContainer = document.querySelectorAll('.container');
    if (alleContainer.length > 1) {
        for (let i = 1; i < alleContainer.length; i++) {
            alleContainer[i].remove();
        }
    }

    const hauptContainer = document.querySelector('.container') || document.body;

    if (!document.getElementById('archiv-auto-grid-styles')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'archiv-auto-grid-styles';
        styleTag.textContent = `
            .container { max-width: 1280px !important; width: 100%; margin: 0 auto; }
            .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
            .kpi-card { background: linear-gradient(145deg, #161316 0%, #100d10 100%); border: 1px solid #3b171b; border-radius: 12px; padding: 16px 18px; box-shadow: 0 8px 24px rgba(0,0,0,0.6); display: flex; flex-direction: column; }
            .kpi-label { font-size: 0.73rem; text-transform: uppercase; letter-spacing: 1px; color: #ff7373; font-weight: 700; }
            .kpi-value { font-size: 2rem; font-weight: 900; color: #ff3b3b; margin: 6px 0 4px; line-height: 1; }
            .kpi-sub { font-size: 0.76rem; color: #888; }
            #archiv-liste { list-style: none; padding: 0; margin: 20px 0 0 0; display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 20px !important; align-items: stretch; }
            .archiv-item { margin-bottom: 0 !important; display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(155deg, #171417 0%, #110e11 100%); border: 1px solid #33181b; border-top: 3px solid #cc1111; border-radius: 12px; padding: 20px; position: relative; }
            @media (max-width: 1024px) { .kpi-grid, #archiv-liste { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 680px) { .kpi-grid, #archiv-liste { grid-template-columns: 1fr !important; } }
        `;
        document.head.appendChild(styleTag);
    }

    const form = document.getElementById('archiv-form');
    const listenElement = document.getElementById('archiv-liste');
    const speichernBtn = document.getElementById('btn-speichern');
    const toggleFormBtn = document.getElementById('btn-toggle-form');
    const sucheInput = document.getElementById('suche-input');

    // Falls die Statistik-Zeile (KPI-Bar) im HTML noch fehlt, automatisch oben einfügen
    if (!document.getElementById('kpi-bar') && hauptContainer) {
        const kpiSection = document.createElement('section');
        kpiSection.id = 'kpi-bar';
        kpiSection.className = 'kpi-grid';
        kpiSection.innerHTML = `
            <div class="kpi-card">
                <span class="kpi-label">Opfer gesamt (Bestätigt)</span>
                <span id="stat-total-victims" class="kpi-value">0</span>
                <span class="kpi-sub">Summe aller erfassten Akten</span>
            </div>
            <div class="kpi-card">
                <span class="kpi-label">Höchste Opferzahl</span>
                <span id="stat-highest-victims" class="kpi-value">0</span>
                <span id="stat-highest-name" class="kpi-sub">–</span>
            </div>
            <div class="kpi-card">
                <span class="kpi-label">Erfasste Fallakten</span>
                <span id="stat-total-killers" class="kpi-value" style="color:#fff;">0</span>
                <span class="kpi-sub">Weltweit synchronisiert</span>
            </div>
            <div class="kpi-card">
                <span class="kpi-label" style="color:#fbbf24;">Ungelöste Phantome</span>
                <span id="stat-unsolved" class="kpi-value" style="color:#fbbf24;">0</span>
                <span class="kpi-sub">Nie gefasst / Ungeklärt</span>
            </div>
        `;
        const zielElement = document.getElementById('live-status-bar') || form || listenElement;
        if (zielElement && zielElement.parentNode) {
            zielElement.parentNode.insertBefore(kpiSection, zielElement);
        }
    }

    if (!document.getElementById('live-status-bar') && hauptContainer) {
        const statusBar = document.createElement('div');
        statusBar.id = 'live-status-bar';
        statusBar.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:10px;background:#1a1212;border:1px solid #331414;border-radius:8px;padding:10px 14px;margin-bottom:20px;font-size:0.85rem;color:#b3b3b3;';
        statusBar.innerHTML = `
            <span id="status-indicator" style="width:10px;height:10px;border-radius:50%;display:inline-block;background:#22c55e;box-shadow:0 0 8px #22c55e;flex-shrink:0;"></span>
            <span id="status-text" style="flex:1;">Verbinde mit weltweiter Live-Datenbank...</span>
            <button type="button" id="btn-refresh" style="background:#241818;color:#ff8080;border:1px solid #4d1f1f;border-radius:6px;padding:5px 10px;font-size:0.8rem;cursor:pointer;width:auto;">↻ Aktualisieren</button>
        `;
        const kpiBar = document.getElementById('kpi-bar');
        if (kpiBar && kpiBar.parentNode) {
            kpiBar.parentNode.insertBefore(statusBar, kpiBar);
        }
    }

    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');
    const refreshBtn = document.getElementById('btn-refresh');

    if (toggleFormBtn && form) {
        toggleFormBtn.addEventListener('click', () => {
            form.classList.toggle('hidden');
            toggleFormBtn.textContent = form.classList.contains('hidden')
                ? '+ Neue Fallakte anlegen'
                : '✕ Formular schließen';
        });
    }

    // CLOUD-DATENBANK KONFIGURATION (JSONBin.io v3 API)
    const BIN_ID = '6ad88424ac6210605a451855';
    const dollar = String.fromCharCode(36);
    const MASTER_KEY = dollar + '2a' + dollar + '10' + dollar + 'j8SdQmHLglHfQa9O3s./YuXHtf/cYQ3Zjqs0nk3sWx4Bv19KCcUx2';
    const DATABASE_URL = 'https://api.jsonbin.io/v3/b/' + BIN_ID;
    const LOESCH_PASSWORT = 'geheim123';

    let meinArchiv = [];
    let letzterDatenHash = '';
    let istAmSpeichern = false;
    let suchbegriff = '';

    function escapeHtml(text) {
        if (!text) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function setzeStatus(typ, nachricht) {
        if (statusIndicator) {
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

    function ermittleOpferzahl(eintrag) {
        if (eintrag.confirmedVictims !== undefined && !isNaN(Number(eintrag.confirmedVictims))) {
            return Number(eintrag.confirmedVictims);
        }
        const match = String(eintrag.titel || '').match(/\((\d+)\s+bestätigte/i);
        return match ? Number(match[1]) : 1;
    }

    function extrahiereEintraege(resBody) {
        const record = resBody && resBody.record !== undefined ? resBody.record : resBody;
        if (Array.isArray(record)) return record;
        if (record && Array.isArray(record.eintraege)) return record.eintraege;
        if (record && Array.isArray(record.killers)) return record.killers;
        return [];
    }

    function aktualisiereStatistiken() {
        const anzahlKillers = meinArchiv.length;
        let opferGesamt = 0;
        let hoechsteOpfer = 0;
        let hoechsterName = '–';
        let ungeloest = 0;

        meinArchiv.forEach((eintrag) => {
            const opfer = ermittleOpferzahl(eintrag);
            opferGesamt += opfer;

            const saubererName = eintrag.name || String(eintrag.titel || 'Unbekannt').split('–')[0].trim();
            if (opfer > hoechsteOpfer) {
                hoechsteOpfer = opfer;
                hoechsterName = saubererName;
            }

            const statusStr = String(eintrag.status || eintrag.datum || '').toLowerCase();
            if (statusStr.includes('ungeklärt') || statusStr.includes('nie gefasst') || statusStr.includes('verschwunden')) {
                ungeloest++;
            }
        });

        const elTotalVictims = document.getElementById('stat-total-victims');
        const elHighestVictims = document.getElementById('stat-highest-victims');
        const elHighestName = document.getElementById('stat-highest-name');
        const elTotalKillers = document.getElementById('stat-total-killers');
        const elUnsolved = document.getElementById('stat-unsolved');
        const elBadge = document.getElementById('eintraege-anzahl');

        if (elTotalVictims) elTotalVictims.textContent = opferGesamt.toLocaleString('de-DE');
        if (elHighestVictims) elHighestVictims.textContent = hoechsteOpfer.toLocaleString('de-DE');
        if (elHighestName) elHighestName.textContent = hoechsterName !== '–' ? `Spitzenreiter: ${hoechsterName}` : '–';
        if (elTotalKillers) elTotalKillers.textContent = String(anzahlKillers);
        if (elUnsolved) elUnsolved.textContent = String(ungeloest);
        if (elBadge) elBadge.textContent = String(anzahlKillers);
    }

    function ansichtRendern(erzwingen = false) {
        const aktuellerHash = JSON.stringify(meinArchiv) + '||' + suchbegriff;
        if (!erzwingen && aktuellerHash === letzterDatenHash) {
            return;
        }
        letzterDatenHash = aktuellerHash;

        aktualisiereStatistiken();
        if (!listenElement) return;
        listenElement.innerHTML = '';

        const gefiltert = meinArchiv
            .map((eintrag, index) => ({ eintrag, index, opfer: ermittleOpferzahl(eintrag) }))
            .filter(({ eintrag }) => {
                if (!suchbegriff) return true;
                const volltext = [
                    eintrag.name,
                    eintrag.alias,
                    eintrag.titel,
                    eintrag.hallmark,
                    eintrag.description,
                    eintrag.beschreibung,
                    eintrag.country,
                    eintrag.activePeriod,
                    eintrag.status
                ].join(' ').toLowerCase();
                return volltext.includes(suchbegriff);
            })
            .sort((a, b) => b.opfer - a.opfer);

        if (gefiltert.length === 0) {
            listenElement.innerHTML = '<p style="grid-column: 1 / -1; color: #888; text-align: center; padding: 30px 0;">Keine passende Fallakte gefunden.</p>';
            return;
        }

        gefiltert.forEach(({ eintrag, index, opfer }) => {
            const name = escapeHtml(eintrag.name || String(eintrag.titel || 'Unbekannter Eintrag').split('–')[0].trim());
            const alias = escapeHtml(eintrag.alias || 'Fallakte');
            const land = escapeHtml(eintrag.country || 'Weltweit');
            const zeitraum = escapeHtml(eintrag.activePeriod || eintrag.datum || 'Unbekannt');
            const status = escapeHtml(eintrag.status || 'Archiviert');
            const hallmark = escapeHtml(eintrag.hallmark || eintrag.beschreibung || 'Keine Beschreibung vorhanden.');
            const details = escapeHtml(eintrag.description || '');
            const vermutet = escapeHtml(eintrag.suspectedVictims || `${opfer}+`);

            const li = document.createElement('li');
            li.className = 'archiv-item';
            li.innerHTML = `
                <div>
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px;">
                        <div>
                            <div style="font-size:0.72rem;text-transform:uppercase;letter-spacing:1px;color:#ff6666;font-family:monospace;">${alias}</div>
                            <h3 style="margin:3px 0 0 0;color:#fff;font-size:1.25rem;">${name}</h3>
                        </div>
                        <div style="background:radial-gradient(circle,#7f1d1d 0%,#450a0a 100%);border:1px solid #ef4444;border-radius:9px;padding:6px 10px;text-align:center;min-width:64px;flex-shrink:0;">
                            <strong style="display:block;font-size:1.25rem;color:#fff;line-height:1;">${opfer}</strong>
                            <span style="font-size:0.62rem;text-transform:uppercase;color:#fca5a5;">Opfer</span>
                        </div>
                    </div>

                    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">
                        <span style="font-size:0.72rem;padding:3px 8px;border-radius:5px;background:#1c181c;border:1px solid #2e262e;color:#ccc;">📍 ${land}</span>
                        <span style="font-size:0.72rem;padding:3px 8px;border-radius:5px;background:#1c181c;border:1px solid #2e262e;color:#ccc;">⏱ ${zeitraum}</span>
                        <span style="font-size:0.72rem;padding:3px 8px;border-radius:5px;background:#2b1114;border:1px solid #5c1d24;color:#fca5a5;">${status}</span>
                    </div>

                    <div style="background:rgba(40,10,14,0.55);border-left:3px solid #ef4444;border-radius:4px 8px 8px 4px;padding:10px 12px;margin-bottom:12px;font-size:0.85rem;color:#e2e2e2;line-height:1.45;">
                        <span style="font-size:0.68rem;text-transform:uppercase;letter-spacing:1px;color:#ff6666;font-weight:700;margin-bottom:4px;display:block;">Was ihn ausmachte (Modus Operandi)</span>
                        ${hallmark}
                    </div>

                    ${details && details !== hallmark ? `<p style="font-size:0.84rem;color:#aaa;line-height:1.5;margin:0 0 16px 0;">${details}</p>` : ''}
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid #241a1d;margin-top:auto;">
                    <small style="color:#777;font-size:0.75rem;">Vermutet: <strong style="color:#ccc;">${vermutet}</strong></small>
                    <button type="button" class="btn-loeschen" data-index="${index}" style="position:static;background:#221618;color:#ff6666;border:1px solid #442226;padding:5px 11px;font-size:0.75rem;font-weight:600;border-radius:6px;cursor:pointer;width:auto;">Löschen</button>
                </div>
            `;
            listenElement.appendChild(li);
        });

        document.querySelectorAll('.btn-loeschen').forEach((button) => {
            button.addEventListener('click', (e) => {
                const indexZumLoeschen = Number(e.currentTarget.getAttribute('data-index'));
                const pwEingabe = prompt('Bitte gib das Administrator-Passwort ein, um diese Fallakte weltweit zu löschen:');
                if (pwEingabe === LOESCH_PASSWORT) {
                    eintragLoeschen(indexZumLoeschen);
                } else if (pwEingabe !== null) {
                    alert('Falsches Passwort! Der Eintrag wurde nicht gelöscht.');
                }
            });
        });
    }

    async function datenLaden(zeigeLadeStatus = false) {
        if (istAmSpeichern) return;
        if (zeigeLadeStatus) setzeStatus('syncing', 'Synchronisiere mit Cloud...');

        try {
            const response = await fetch(`${DATABASE_URL}/latest`, {
                method: 'GET',
                headers: { 'X-Master-Key': MASTER_KEY },
                cache: 'no-store'
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const resBody = await response.json();
            meinArchiv = extrahiereEintraege(resBody);
            localStorage.setItem('archivDatenBackup', JSON.stringify(meinArchiv));

            ansichtRendern();

            const uhrzeit = new Date().toLocaleTimeString('de-DE');
            setzeStatus('online', `Live verbunden (${meinArchiv.length} Akten • Stand: ${uhrzeit} Uhr)`);
        } catch (error) {
            console.error('Cloud-Ladefehler:', error);
            setzeStatus('error', 'Offline-Backup aktiv');
        }
    }

    async function speichereArchivInCloud(neuesArchiv) {
        const payload = neuesArchiv.length > 0 ? neuesArchiv : { eintraege: [] };
        const response = await fetch(DATABASE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': MASTER_KEY
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`Status ${response.status}`);
        return await response.json();
    }

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const titelInput = document.getElementById('titel');
            const aliasInput = document.getElementById('alias');
            const opferInput = document.getElementById('opfer');
            const landInput = document.getElementById('land');
            const zeitraumInput = document.getElementById('zeitraum');
            const statusInput = document.getElementById('status');
            const beschreibungInput = document.getElementById('beschreibung');

            const name = titelInput ? titelInput.value.trim() : '';
            const alias = aliasInput && aliasInput.value.trim() ? aliasInput.value.trim() : 'Fallakte';
            const opfer = opferInput ? (parseInt(opferInput.value, 10) || 1) : 1;
            const land = landInput && landInput.value.trim() ? landInput.value.trim() : 'Weltweit';
            const zeitraum = zeitraumInput && zeitraumInput.value.trim() ? zeitraumInput.value.trim() : new Date().toLocaleDateString('de-DE');
            const status = statusInput ? statusInput.value : 'Ungeklärt / Nie gefasst';
            const beschreibung = beschreibungInput ? beschreibungInput.value.trim() : '';

            if (!name || !beschreibung) return;

            const neuerEintrag = {
                id: 'killer-' + Date.now(),
                name: name,
                alias: alias,
                confirmedVictims: opfer,
                suspectedVictims: `${opfer}+`,
                activePeriod: zeitraum,
                country: land,
                status: status,
                hallmark: beschreibung,
                description: '',
                titel: `${name}${alias ? ` – „${alias}“` : ''} (${opfer} bestätigte Opfer)`,
                beschreibung: `WAS IHN AUSMACHTE: ${beschreibung}`,
                datum: `Ära: ${zeitraum} | Ort: ${land} | Status: ${status}`
            };

            istAmSpeichern = true;
            if (speichernBtn) {
                speichernBtn.disabled = true;
                speichernBtn.textContent = 'Wird weltweit gespeichert...';
            }
            setzeStatus('syncing', 'Sende neuen Eintrag an die Cloud...');

            try {
                const latestResp = await fetch(`${DATABASE_URL}/latest`, {
                    method: 'GET',
                    headers: { 'X-Master-Key': MASTER_KEY },
                    cache: 'no-store'
                });
                if (latestResp.ok) {
                    meinArchiv = extrahiereEintraege(await latestResp.json());
                }

                meinArchiv.unshift(neuerEintrag);
                await speichereArchivInCloud(meinArchiv);

                form.reset();
                form.classList.add('hidden');
                if (toggleFormBtn) toggleFormBtn.textContent = '+ Neue Fallakte anlegen';

                ansichtRendern(true);
                setzeStatus('online', `Eintrag veröffentlicht! (${meinArchiv.length} Akten)`);
            } catch (error) {
                alert('Fehler beim Speichern in der Cloud.');
            } finally {
                istAmSpeichern = false;
                if (speichernBtn) {
                    speichernBtn.disabled = false;
                    speichernBtn.textContent = 'Eintrag weltweit speichern';
                }
            }
        });
    }

    async function eintragLoeschen(index) {
        istAmSpeichern = true;
        setzeStatus('syncing', 'Lösche Eintrag aus der Cloud...');
        try {
            const latestResp = await fetch(`${DATABASE_URL}/latest`, {
                method: 'GET',
                headers: { 'X-Master-Key': MASTER_KEY },
                cache: 'no-store'
            });
            if (latestResp.ok) {
                meinArchiv = extrahiereEintraege(await latestResp.json());
            }

            if (index >= 0 && index < meinArchiv.length) {
                meinArchiv.splice(index, 1);
                await speichereArchivInCloud(meinArchiv);
                ansichtRendern(true);
                setzeStatus('online', `Gelöscht (${meinArchiv.length} Akten verbleibend)`);
            }
        } catch (error) {
            alert('Fehler beim Löschen: ' + error.message);
        } finally {
            istAmSpeichern = false;
        }
    }

    if (sucheInput) {
        sucheInput.addEventListener('input', (e) => {
            suchbegriff = e.target.value.trim().toLowerCase();
            ansichtRendern(true);
        });
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => datenLaden(true));
    }

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') datenLaden(false);
    });

    datenLaden(true);
    setInterval(() => datenLaden(false), 5000);
});
